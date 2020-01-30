import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LocalStorageService } from './../services/local-storage.service';
import { AuthenticationService } from './../services/authentication.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.localStorageService.getToken() === null || this.localStorageService.getCurrentUser() === null) {
            this.authenticationService.signOut();
            this.router.navigate(['/sign-in']);
            return false;
        } else {
            return true;
        }

    }

}
