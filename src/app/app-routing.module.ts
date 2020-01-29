import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const APP_ROUTES: Routes = [];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
