import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppLibrariesModule } from './app-libraries.module';
import { AppServicesModule } from './app-services.module';

import { AppComponent } from './app.component';


@NgModule({
    declarations: [
        AppComponent
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
