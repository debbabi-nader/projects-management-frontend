import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectManagerComponent } from './project-manager.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';


const PROJECT_MANAGER_ROUTES: Routes = [
    {
        path: '',
        component: ProjectManagerComponent,
        children: [
            {
                path: 'projects-list',
                component: ProjectsListComponent
            },
            {
                path: 'project-details/:id',
                component: ProjectDetailsComponent
            },
            {
                path: '**',
                redirectTo: 'projects-list',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(PROJECT_MANAGER_ROUTES) ],
    exports: [ RouterModule ]
})
export class ProjectManagerRoutingModule { }
