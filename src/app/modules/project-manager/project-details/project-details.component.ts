import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectService } from './../../../services/project.service';
import { TaskService } from './../../../services/task.service';

import { EditProjectDialogComponent } from './../edit-project-dialog/edit-project-dialog.component';
import { NewTaskDialogComponent } from './../new-task-dialog/new-task-dialog.component';
import { EditTaskDialogComponent } from './../edit-task-dialog/edit-task-dialog.component';
import { ConfirmationDialogComponent } from './../../shared/components/confirmation-dialog/confirmation-dialog.component';

import { Project } from './../../../models/project.model';
import { Task } from './../../../models/task.model';
import { ErrorResponse } from './../../../models/error-response.model';
import { DialogData } from './../../../models/dialog-data.model';


@Component({
    templateUrl: './project-details.component.html',
    styleUrls: [ './project-details.component.scss' ]
})
export class ProjectDetailsComponent implements OnInit {

    projectId: string;
    project: Project = new Project();

    tasks: Task[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private projectService: ProjectService,
        private taskService: TaskService
    ) {}

    ngOnInit() {

        this.activatedRoute.paramMap.subscribe(
            (paramMap: ParamMap) => {
                this.projectId = paramMap.get('id');
                this.loadProject();
                this.loadProjectTasks();
            }
        );

    }

    loadProject() {

        this.projectService.getProjectById(this.projectId).subscribe(
            (project: Project) => {
                this.project = project;
            },
            (error: ErrorResponse) => {
                this.snackBar.open('Something went wrong! Please try again later.');
                this.router.navigateByUrl('/app/project-manager/projects-list');
            }
        );

    }

    onEditProject() {

        const DIALOG_REF = this.dialog.open(
            EditProjectDialogComponent,
            {
                width: '500px',
                data: {
                    projectId: this.projectId
                }
            }
        );

        DIALOG_REF.afterClosed().subscribe(
            (state) => {
                if (state === true) {
                    this.loadProject();
                }
            }
        );

    }

    onDeleteProject() {

        const DIALOG_DATA: DialogData = {
            title: 'Delete a project',
            content: 'You\'re about to delete this project, do you wish to proceed?'
        };

        const DIALOG_REF = this.dialog.open(
            ConfirmationDialogComponent,
            {
                data: DIALOG_DATA
            }
        );

        DIALOG_REF.afterClosed().subscribe(result => {
            if (result === true) {
                this.projectService.deleteProject(this.projectId).subscribe(
                    () => {
                        this.router.navigateByUrl('/app/project-manager/projects-list');
                        this.snackBar.open('Project deleted successfully!');
                    },
                    (error: ErrorResponse) => {
                        this.snackBar.open('Something went wrong! Please try again later.');
                    }
                );
            }
        });

    }

    loadProjectTasks() {

        this.taskService.getTasksByProjectId(this.projectId).subscribe(
            (tasks: Task[]) => {
                this.tasks = tasks;
            }
        );

    }

    onAddNewTask() {

        const DIALOG_REF = this.dialog.open(
            NewTaskDialogComponent,
            {
                width: '500px',
                data: {
                    projectId: this.projectId
                }
            }
        );

        DIALOG_REF.afterClosed().subscribe(
            (state) => {
                if (state === true) {
                    this.loadProjectTasks();
                }
            }
        );

    }

    onEditTask(taskIndex: number) {

        const DIALOG_REF = this.dialog.open(
            EditTaskDialogComponent,
            {
                width: '500px',
                data: {
                    taskId: this.tasks[taskIndex].id
                }
            }
        );

        DIALOG_REF.afterClosed().subscribe(
            (state) => {
                if (state === true) {
                    this.loadProjectTasks();
                }
            }
        );

    }

    onDeleteTask(taskIndex: number) {

        const DIALOG_DATA: DialogData = {
            title: 'Delete task',
            content: 'You\'re about to delete a task, do you wish to proceed?'
        };

        const DIALOG_REF = this.dialog.open(
            ConfirmationDialogComponent,
            {
                data: DIALOG_DATA
            }
        );

        DIALOG_REF.afterClosed().subscribe(result => {
            if (result === true) {
                this.taskService.deleteTask(this.tasks[taskIndex].id).subscribe(
                    () => {
                        this.loadProjectTasks();
                        this.snackBar.open('Task deleted successfully!');
                    },
                    (error: ErrorResponse) => {
                        this.snackBar.open('Something went wrong! Please try again later.');
                    }
                );
            }
        });

    }

}
