import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './../../guards/authorization.guard';

import { AdministratorComponent } from './administrator.component';


const ADMINISTRATOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministratorComponent,
        canActivate: [ AuthorizationGuard ],
        children: []
    }
];

@NgModule({
    imports: [ RouterModule.forChild(ADMINISTRATOR_ROUTES) ],
    exports: [ RouterModule ]
})
export class  AdministratorRoutingModule { }
