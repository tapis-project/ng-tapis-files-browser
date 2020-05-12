import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './services/authentication.service';
import {LoginComponent} from './components/login/login.component';
import {DataBrowserComponent} from './components/data-browser/data-browser.component';
import {MainComponent} from './components/main/main.component';

@Injectable()
export class Activate implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.authSvc.isLoggedIn()) {
      return true;
    }
    this.authSvc.login();
  }
}


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, canActivate: [Activate]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [Activate]
})
export class AppRoutingModule { }
