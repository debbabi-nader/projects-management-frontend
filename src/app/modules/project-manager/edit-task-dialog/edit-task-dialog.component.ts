import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from './../../../services/task.service';

import { blankValidator } from './../../../utils/validators.util';
import { inputValuesComparator } from './../../../utils/comparators.util';

import { Task } from './../../../models/task.model';
import { ErrorResponse } from './../../../models/error-response.model';


@Component({
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: [ './edit-task-dialog.component.scss' ]
})
export class EditTaskDialogComponent implements OnInit {

    taskId: string;
    task: Task = new Task();

    editTaskFormGroup: FormGroup = this.formBuilder.group({
        reference: [ '' ]
    });

    isFormChanged = false;
    changes = {};

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<EditTaskDialogComponent>,
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {

        this.taskId = this.data.taskId;
        this.loadTask();

    }

    loadTask() {

        this.taskService.getTaskById(this.taskId).subscribe(
            (task: Task) => {
                this.task = task;
                this.editTaskFormGroup = this.formBuilder.group({
                    reference: [ this.task.reference, Validators.required, blankValidator() ]
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

        const OLD_VALUE = this.task[inputId];
        const NEW_VALUE = this.editTaskFormGroup.get(inputId).value;

        if (inputValuesComparator(OLD_VALUE, NEW_VALUE)) {
            this.changes[inputId] = NEW_VALUE;
        } else {
            delete this.changes[inputId];
        }

        this.isFormChanged = JSON.stringify(this.changes) !== '{}';

    }

    reset() {

        this.editTaskFormGroup.reset();
        this.isFormChanged = false;
        this.changes = {};

    }

    onCancel() {

        this.reset();
        this.dialogRef.close(false);

    }

    onSubmit() {

        this.taskService.partialUpdateTask(this.taskId, this.changes).subscribe(
            (task: Task) => {
                this.snackBar.open('Task edited successfully!');
                this.reset();
                this.dialogRef.close(true);
            },
            (error: ErrorResponse) => {
                if (error.status === 400) {
                    this.snackBar.open('Something is not right! Please verify your input and try again later');
                }
                if (error.status === 409) {
                    this.editTaskFormGroup.get('reference').setErrors({ notUnique: true });
                }
            }
        );

    }

}
