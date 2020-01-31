import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectService } from './../../../services/project.service';

import { blankValidator } from './../../../utils/validators.util';
import { inputValuesComparator } from './../../../utils/comparators.util';

import { Project } from './../../../models/project.model';
import { ErrorResponse } from './../../../models/error-response.model';


@Component({
    templateUrl: './edit-project-dialog.component.html',
    styleUrls: [ './edit-project-dialog.component.scss' ]
})
export class EditProjectDialogComponent implements OnInit {

    projectId: string;
    project: Project = new Project();

    editProjectFormGroup: FormGroup = this.formBuilder.group({
        reference: [ '' ],
        description: [ '' ]
    });

    isFormChanged = false;
    changes = {};

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<EditProjectDialogComponent>,
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {

        this.projectId = this.data.projectId;
        this.loadProject();

    }

    loadProject() {

        this.projectService.getProjectById(this.projectId).subscribe(
            (project: Project) => {
                this.project = project;
                this.editProjectFormGroup = this.formBuilder.group({
                    reference: [ this.project.reference, Validators.required, blankValidator() ],
                    description: [ this.project.description, [ Validators.required, Validators.maxLength(250) ], [ blankValidator() ] ]
                });
            },
            (error: ErrorResponse) => {
                if (error.status === 404) {
                    this.dialogRef.close(true);
                } else {
                    this.snackBar.open('Something went wrong! Please try again later.');
                    this.dialogRef.close(false);
                }
            }
        );

    }

    detectInputChanges(inputId: string) {

        const OLD_VALUE = this.project[inputId];
        const NEW_VALUE = this.editProjectFormGroup.get(inputId).value;

        if (inputValuesComparator(OLD_VALUE, NEW_VALUE)) {
            this.changes[inputId] = NEW_VALUE;
        } else {
            delete this.changes[inputId];
        }

        this.isFormChanged = JSON.stringify(this.changes) !== '{}';

    }

    reset() {

        this.editProjectFormGroup.reset();
        this.isFormChanged = false;
        this.changes = {};

    }

    onCancel() {

        this.reset();
        this.dialogRef.close(false);

    }

    onSubmit() {

        this.projectService.partialUpdateProject(this.projectId, this.changes).subscribe(
            (project: Project) => {
                this.snackBar.open('Project edited successfully!');
                this.reset();
                this.dialogRef.close(true);
            },
            (error: ErrorResponse) => {
                if (error.status === 400) {
                    this.snackBar.open('Something is not right! Please verify your input and try again later');
                }
                if (error.status === 409) {
                    this.editProjectFormGroup.get('reference').setErrors({ notUnique: true });
                }
            }
        );

    }

}
