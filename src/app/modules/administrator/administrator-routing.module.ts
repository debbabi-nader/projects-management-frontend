import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministratorComponent } from './administrator.component';


const ADMINISTRATOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministratorComponent,
        children: []
    }
];

@NgModule({
    imports: [ RouterModule.forChild(ADMINISTRATOR_ROUTES) ],
    exports: [ RouterModule ]
})
export class AdministratorRoutingModule { }
