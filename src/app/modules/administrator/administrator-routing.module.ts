import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministratorComponent } from './administrator.component';
import { UsersListComponent } from './users-list/users-list.component';


const ADMINISTRATOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministratorComponent,
        children: [
            {
                path: 'users-list',
                component: UsersListComponent
            },
            {
                path: '**',
                redirectTo: 'users-list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(ADMINISTRATOR_ROUTES) ],
    exports: [ RouterModule ]
})
export class AdministratorRoutingModule { }
