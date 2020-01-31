import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLibrariesModule } from './../../app-libraries.module';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
    declarations: [
        ConfirmationDialogComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        AppLibrariesModule
    ],
    exports: [],
    providers: []
})
export class SharedModule { }
