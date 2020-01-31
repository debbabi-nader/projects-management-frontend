import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLibrariesModule } from './../../app-libraries.module';
import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ProjectManagerComponent } from './project-manager.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';


@NgModule({
    declarations: [
        ProjectManagerComponent,
        ProjectsListComponent,
        ProjectDetailsComponent
    ],
    imports: [
        CommonModule,
        AppLibrariesModule,
        ProjectManagerRoutingModule,
        SharedModule
    ]
})
export class ProjectManagerModule { }
