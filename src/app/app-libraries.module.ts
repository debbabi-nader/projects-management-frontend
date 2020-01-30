import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';


@NgModule({
    imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule
    ],
    exports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' } }
    ]
})
export class AppLibrariesModule { }
