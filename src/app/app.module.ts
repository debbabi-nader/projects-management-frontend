import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppLibrariesModule } from './app-libraries.module';
import { AppServicesModule } from './app-services.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AppLayoutComponent } from './pages/app-layout/app-layout.component';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        AppLayoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLibrariesModule,
        AppServicesModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
