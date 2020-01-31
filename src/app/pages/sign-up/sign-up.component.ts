import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from './../../services/authentication.service';
import { LocalStorageService } from './../../services/local-storage.service';

import { blankValidator, customEmailValidator, passwordStrengthValidator } from 'src/app/utils/validators.util';

import { User } from './../../models/user.model';
import { Token } from './../../models/token.model';
import { ErrorResponse } from './../../models/error-response.model';

import { ProfileTypesEnum } from './../../enumerations/profile-types.enum';


@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: [ './sign-up.component.scss' ]
})
export class SignUpComponent {

    signUpFormGroup: FormGroup = this.formBuilder.group({
        firstName: [ '', Validators.required, blankValidator() ],
        lastName: [ '', Validators.required, blankValidator() ],
        email: [ '', Validators.required, customEmailValidator() ],
        password: [ '', Validators.required, passwordStrengthValidator() ],
        passwordConfirmation: [ '', Validators.required ]
    });

    showLoader = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private authenticationService: AuthenticationService,
        private localStorageService: LocalStorageService
    ) {}

    onSignUp() {

        if (this.signUpFormGroup.get('password').value !== this.signUpFormGroup.get('passwordConfirmation').value) {
            this.signUpFormGroup.get('passwordConfirmation').setErrors({ notIdentical: true });
            return;
        }

        this.showLoader = true;

        const USER: User = new User();
        USER.profileType = ProfileTypesEnum.PROJECT_MANAGER;
        USER.firstName = this.signUpFormGroup.get('firstName').value;
        USER.lastName = this.signUpFormGroup.get('lastName').value;
        USER.email = this.signUpFormGroup.get('email').value;
        USER.password = this.signUpFormGroup.get('password').value;

        this.authenticationService.signUp(USER).subscribe(
            (user: User) => {
                this.authenticationService.signIn(USER.email, USER.password).subscribe(
                    (token: Token) => {
                        this.localStorageService.setCurrentUser(user);
                        this.localStorageService.setToken(token);
                        this.snackBar.open('Welcome to Projects Management');
                        this.router.navigate(['/app/' + user.profileType.toLowerCase().replace('_', '-')]);
                        this.signUpFormGroup.reset();
                        this.showLoader = false;
                    },
                    (error: ErrorResponse) => {
                        this.showLoader = false;
                        this.snackBar.open('Something is not right! Please try to sign in');
                        this.router.navigateByUrl('/sign-in');
                    }
                );
            },
            (error: ErrorResponse) => {
                this.showLoader = false;
                switch (error.status) {
                    case 400:
                        this.snackBar.open('Something is not right! Please verify your input and try again later');
                        break;
                    case 409:
                        this.signUpFormGroup.get('email').setErrors({ notUnique: true });
                        this.signUpFormGroup.get('password').reset();
                        this.signUpFormGroup.get('passwordConfirmation').reset();
                        break;
                }
            }
        );

    }

}
