import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../services/user.service';
import { LocalStorageService } from './../../../services/local-storage.service';

import { User } from './../../../models/user.model';
import { ErrorResponse } from './../../../models/error-response.model';


@Component({
    templateUrl: './users-list.component.html',
    styleUrls: [ './users-list.component.scss' ]
})
export class UsersListComponent implements OnInit {

    users: User[] = [];
    usersTableColumns: string[] = [ 'user', 'email', 'profileType', 'accountCreationDate' ];

    constructor(
        private userService: UserService,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit() {

        this.userService.getUsers().subscribe(
            (users: User[]) => {
                this.users = users.filter((user: User) => user.id !== this.localStorageService.getCurrentUser().id);
            },
            (error: ErrorResponse) => {
                this.users = [];
            }
        );

    }

}
