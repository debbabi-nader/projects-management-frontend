import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './../../services/local-storage.service';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';

import { customEmailValidator } from 'src/app/utils/validators.util';

import { Token } from './../../models/token.model';
import { User } from './../../models/user.model';
import { ErrorResponse } from './../../models/error-response.model';


@Component({
    templateUrl: './sign-in.component.html',
    styleUrls: [ './sign-in.component.scss' ]
})
export class SignInComponent implements OnInit {

    signInFormGroup: FormGroup = this.formBuilder.group({
        email: [ '', Validators.required, customEmailValidator() ],
        password: [ '', Validators.required ]
    });

    hidePassword = true;
    showLoader = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private localStorageService: LocalStorageService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {}

    ngOnInit() {

        const TOKEN: Token = this.localStorageService.getToken();
        if (TOKEN !== null) {
            this.authenticationService.verifyToken(TOKEN).subscribe(
                () => {
                    const CURRENT_USER = this.localStorageService.getCurrentUser();
                    this.router.navigate(['/app/' + CURRENT_USER.profileType.toLowerCase().replace('_', '-')]);
                },
                (error: ErrorResponse) => {
                    this.authenticationService.signOut();
                }
            );
        } else {
            this.authenticationService.signOut();
        }

    }

    onSignIn() {

        this.showLoader = true;

        this.authenticationService.signIn(this.signInFormGroup.get('email').value, this.signInFormGroup.get('password').value).subscribe(
            (token: Token) => {
                this.localStorageService.setToken(token);
                this.userService.getUserByEmail(this.signInFormGroup.get('email').value).subscribe(
                    (currentUser: User) => {
                        this.localStorageService.setCurrentUser(currentUser);
                        this.snackBar.open('Welcome to Projects Management');
                        this.router.navigate(['/app/' + currentUser.profileType.toLowerCase().replace('_', '-')]);
                        this.signInFormGroup.reset();
                        this.showLoader = false;
                    },
                    (error: ErrorResponse) => {
                        this.showLoader = false;
                    }
                );
            },
            (error: ErrorResponse) => {
                this.showLoader = false;
                switch (error.status) {
                    case 401:
                        this.signInFormGroup.get('password').setErrors({ wrongPassword: true });
                        break;
                    case 403:
                        this.snackBar.open('This account is not currently active!');
                        break;
                    case 404:
                        this.signInFormGroup.get('email').setErrors({ accountNotFound: true });
                        this.signInFormGroup.get('password').reset();
                        break;
                }
            }
        );

    }

}
