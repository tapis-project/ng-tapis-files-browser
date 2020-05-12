import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'ng-tapis-file-browser';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log("app component")
    this.authService.login();
  }

}
