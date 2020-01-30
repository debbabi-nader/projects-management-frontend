import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AppLayoutComponent } from './pages/app-layout/app-layout.component';


const APP_ROUTES: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        canActivate: [ AuthenticationGuard, AuthorizationGuard ],
        children: [
            {
                path: 'administrator',
                loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule)
            },
            {
                path: 'project-manager',
                loadChildren: () => import('./modules/project-manager/project-manager.module').then(m => m.ProjectManagerModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
