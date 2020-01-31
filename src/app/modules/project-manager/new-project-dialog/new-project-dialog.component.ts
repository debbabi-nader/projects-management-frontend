import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../../services/local-storage.service';
import { ProjectService } from './../../../services/project.service';

import { blankValidator } from './../../../utils/validators.util';

import { Project } from './../../../models/project.model';
import { User } from './../../../models/user.model';
import { ErrorResponse } from './../../../models/error-response.model';


@Component({
    templateUrl: './new-project-dialog.component.html',
    styleUrls: [ './new-project-dialog.component.scss' ]
})
export class NewProjectDialogComponent {

    newProjectFormGroup: FormGroup = this.formBuilder.group({
        reference: [ '', Validators.required, blankValidator() ],
        description: [ '', [ Validators.required, Validators.maxLength(250) ], [ blankValidator() ] ]
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<NewProjectDialogComponent>,
        private formBuilder: FormBuilder,
        private localStorageService: LocalStorageService,
        private projectService: ProjectService,
        private snackBar: MatSnackBar
    ) {}

    onCancel() {

        this.newProjectFormGroup.reset();
        this.dialogRef.close(false);

    }

    onSubmit() {

        const PROJECT: Project = new Project();
        PROJECT.reference = this.newProjectFormGroup.get('reference').value;
        PROJECT.description = this.newProjectFormGroup.get('description').value;
        const CURRENT_PROJECT_MANAGER: User = this.localStorageService.getCurrentUser();
        if (CURRENT_PROJECT_MANAGER !== null) {
            PROJECT.manager.id = CURRENT_PROJECT_MANAGER.id;
        }

        this.projectService.createProject(PROJECT).subscribe(
            (project: Project) => {
                this.snackBar.open('Project created successfully!');
                this.newProjectFormGroup.reset();
                this.dialogRef.close(true);
            },
            (error: ErrorResponse) => {
                if (error.status === 400) {
                    this.snackBar.open('Something is not right! Please verify your input and try again later');
                }
                if (error.status === 409) {
                    this.newProjectFormGroup.get('reference').setErrors({ notUnique: true });
                }
            }
        );

    }

}
