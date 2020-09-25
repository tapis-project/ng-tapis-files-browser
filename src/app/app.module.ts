import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBrowserComponent } from './components/data-browser/data-browser.component';
import { LoginComponent } from './components/login/login.component';
import {AuthService} from './services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor, JwtInterceptor} from './app.interceptors';
import {ApiModule as FilesClient} from './apis/ng-tapis-files-client';
import {ApiModule as SystemsClient, Configuration} from './apis/ng-tapis-systems-client';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { FileListingRowComponent } from './components/file-listing-row/file-listing-row.component';
import {NgxFilesizeModule} from 'ngx-filesize';
import { ModalPreviewComponent } from './components/modal-preview/modal-preview.component';
import { SecuredImageComponent } from './components/secured-image/secured-image.component';
import { SecuredTextComponent } from './components/secured-text/secured-text.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DataBrowserComponent,
    LoginComponent,
    MainComponent,
    FileListingRowComponent,
    ModalPreviewComponent,
    SecuredImageComponent,
    SecuredTextComponent
  ],
  imports: [
    FilesClient.forRoot((): Configuration => new Configuration({basePath: environment.baseUrl})),
    SystemsClient.forRoot((): Configuration => new Configuration({basePath: environment.baseUrl})),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFilesizeModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: JwtInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
