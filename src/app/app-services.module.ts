import { NgModule } from '@angular/core';

import { LocalStorageService } from './services/local-storage.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';


@NgModule({
    providers: [
        LocalStorageService,
        AuthenticationService,
        UserService,
        ProjectService,
        TaskService
    ]
})
export class AppServicesModule { }
