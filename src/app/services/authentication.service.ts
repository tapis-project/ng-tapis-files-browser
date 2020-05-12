import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';

interface IAccessToken {
  access_token: {
    access_token: string;
    expires_at: Date;
    expires_in: number;
    jti: string;
  };
}

interface ITokenResponse {
  message: string;
  result: IAccessToken;
  status: string;
  version: string;

}

export class AuthenticatedUser {
  public readonly username: string;
  private jwt: string;

  constructor(username: string, jwt: string) {
    this.username = username;
    this.jwt = jwt;
  }
}

class AuthToken {
  private token: string;
  private expires: Date;

  constructor(token: string, expires: Date) {
    this.token = token;
    this.expires = new Date(expires);
  }

  public isExpired(): boolean {
    return new Date().getTime() > this.expires.getTime();
  }

  public getToken(): string {
    return this.token;
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private currentUser: ReplaySubject<AuthenticatedUser> = new ReplaySubject<AuthenticatedUser>(1);
  public readonly currentUser$: Observable<AuthenticatedUser> = this.currentUser.asObservable();
  private LS_TOKEN_KEY = 'jwt';
  private userToken: AuthToken;

  constructor(private http: HttpClient, private router: Router) {}

  public login() {
    // First, check if the user has a token in localStorage
    const tokenStr = localStorage.getItem(this.LS_TOKEN_KEY);
    if (!tokenStr) {
      this.router.navigate(['/login']);
    } else {
      const token = JSON.parse(tokenStr);
      this.userToken = new AuthToken(token.token, new Date(token.expires));
      if (!this.userToken || this.userToken.isExpired()) {
        this.logout();
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  public loginRequest(uname: string, passwd: string): void {

    const payload = {
      username: uname,
      password: passwd,
      grant_type: 'password'
    };

    this.http.post<ITokenResponse>(environment.baseUrl + '/v3/oauth2/tokens', payload).subscribe( (resp) => {
      console.log(resp);
      this.userToken = new AuthToken(resp.result.access_token.access_token, resp.result.access_token.expires_at);
      this.setToken();
    });


  }

  public getUserToken(): AuthToken {
    return this.userToken;
  }

  /**
   * Checks to make sure that the user has a token and the token is not expired;
   */
  public isLoggedIn(): boolean {
    return this.userToken && !this.userToken.isExpired();
  }

  public logout(): void {
    this.userToken = null;
    localStorage.removeItem(this.LS_TOKEN_KEY);
  }

  public setToken(): void {
    // this.userToken =  new AuthToken(token, expires);
    localStorage.setItem(this.LS_TOKEN_KEY, JSON.stringify(this.userToken));
    this.router.navigate(['/']);
  }

}
