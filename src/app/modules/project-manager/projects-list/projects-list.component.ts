import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../../services/local-storage.service';
import { ProjectService } from './../../../services/project.service';

import { NewProjectDialogComponent } from './../new-project-dialog/new-project-dialog.component';
import { EditProjectDialogComponent } from './../edit-project-dialog/edit-project-dialog.component';
import { ConfirmationDialogComponent } from './../../../modules/shared/components/confirmation-dialog/confirmation-dialog.component';

import { User } from './../../../models/user.model';
import { Project } from './../../../models/project.model';
import { ErrorResponse } from './../../../models/error-response.model';
import { DialogData } from './../../../models/dialog-data.model';


@Component({
    templateUrl: './projects-list.component.html',
    styleUrls: [ './projects-list.component.scss' ]
})
export class ProjectsListComponent implements OnInit {

    currentProjectManagerId: string;
    projects: Project[] = [];

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private localStorageService: LocalStorageService,
        private projectService: ProjectService
    ) {}

    ngOnInit() {

        const CURRENT_PROJECT_MANAGER: User = this.localStorageService.getCurrentUser();
        if (CURRENT_PROJECT_MANAGER !== null) {
            this.currentProjectManagerId = CURRENT_PROJECT_MANAGER.id;
        }
        this.loadProjects();

    }

    loadProjects() {

        this.projectService.getProjectsByManagerId(this.currentProjectManagerId).subscribe(
            (projects: Project[]) => {
                this.projects = projects;
            }
        );

    }

    onAddNewProject() {

        const DIALOG_REF = this.dialog.open(
            NewProjectDialogComponent,
            {
                width: '500px',
                data: {}
            }
        );

        DIALOG_REF.afterClosed().subscribe(
            (state) => {
                if (state === true) {
                    this.loadProjects();
                }
            }
        );

    }

    onEditProject(projectIndex: number) {

        const DIALOG_REF = this.dialog.open(
            EditProjectDialogComponent,
            {
                width: '500px',
                data: {
                    projectId: this.projects[projectIndex].id
                }
            }
        );

        DIALOG_REF.afterClosed().subscribe(
            (state) => {
                if (state === true) {
                    this.loadProjects();
                }
            }
        );

    }

    onDeleteProject(projectIndex: number) {

        const DIALOG_DATA: DialogData = {
            title: 'Delete a project',
            content: 'You\'re about to delete a project, do you wish to proceed?'
        };

        const DIALOG_REF = this.dialog.open(
            ConfirmationDialogComponent,
            {
                data: DIALOG_DATA
            }
        );

        DIALOG_REF.afterClosed().subscribe(result => {
            if (result === true) {
                this.projectService.deleteProject(this.projects[projectIndex].id).subscribe(
                    () => {
                        this.loadProjects();
                        this.snackBar.open('Project deleted successfully!');
                    },
                    (error: ErrorResponse) => {
                        this.snackBar.open('Something went wrong! Please try again later.');
                    }
                );
            }
        });

    }

    navigateToProjectDetails(projectId: string) {

        this.router.navigateByUrl('/app/project-manager/project-details/' + projectId);

    }

}
