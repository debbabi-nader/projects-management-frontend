import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from './../../../services/task.service';

import { blankValidator } from './../../../utils/validators.util';

import { Task } from './../../../models/task.model';
import { ErrorResponse } from './../../../models/error-response.model';


@Component({
    templateUrl: './new-task-dialog.component.html',
    styleUrls: [ './new-task-dialog.component.scss' ]
})
export class NewTaskDialogComponent {

    newTaskFormGroup: FormGroup = this.formBuilder.group({
        reference: [ '', Validators.required, blankValidator() ]
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<NewTaskDialogComponent>,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private snackBar: MatSnackBar
    ) {}

    onCancel() {

        this.newTaskFormGroup.reset();
        this.dialogRef.close(false);

    }

    onSubmit() {

        const TASK: Task = new Task();
        TASK.reference = this.newTaskFormGroup.get('reference').value;
        TASK.project.id = this.data.projectId;

        this.taskService.createTask(TASK).subscribe(
            (task: Task) => {
                this.snackBar.open('Task created successfully!');
                this.newTaskFormGroup.reset();
                this.dialogRef.close(true);
            },
            (error: ErrorResponse) => {
                if (error.status === 400) {
                    this.snackBar.open('Something is not right! Please verify your input and try again later');
                }
                if (error.status === 409) {
                    this.newTaskFormGroup.get('reference').setErrors({ notUnique: true });
                }
            }
        );

    }

}
