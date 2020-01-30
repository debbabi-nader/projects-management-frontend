import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLibrariesModule } from './../../app-libraries.module';
import { AdministratorRoutingModule } from './administrator-routing.module';

import { AdministratorComponent } from './administrator.component';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
    declarations: [
        AdministratorComponent,
        UsersListComponent
    ],
    imports: [
        CommonModule,
        AppLibrariesModule,
        AdministratorRoutingModule
    ]
})
export class AdministratorModule { }
