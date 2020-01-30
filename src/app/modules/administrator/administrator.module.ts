import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLibrariesModule } from './../../app-libraries.module';
import { AdministratorRoutingModule } from './administrator-routing.module';

import { AdministratorComponent } from './administrator.component';


@NgModule({
    declarations: [
        AdministratorComponent
    ],
    imports: [
        CommonModule,
        AppLibrariesModule,
        AdministratorRoutingModule
    ]
})
export class AdministratorModule { }
