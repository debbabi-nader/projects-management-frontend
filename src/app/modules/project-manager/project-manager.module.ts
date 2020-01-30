import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLibrariesModule } from './../../app-libraries.module';
import { ProjectManagerRoutingModule } from './project-manager-routing.module';

import { ProjectManagerComponent } from './project-manager.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';


@NgModule({
    declarations: [
        ProjectManagerComponent,
        ProjectsListComponent
    ],
    imports: [
        CommonModule,
        AppLibrariesModule,
        ProjectManagerRoutingModule
    ]
})
export class ProjectManagerModule { }
