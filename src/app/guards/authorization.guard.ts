import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from './../services/local-storage.service';

import { User } from './../models/user.model';
import { ProfileTypesEnum } from '../enumerations/profile-types.enum';


@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private localStorageService: LocalStorageService,
        private location: Location
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const CURRENT_USER: User = this.localStorageService.getCurrentUser();

        if (CURRENT_USER !== null) {
            const CHECK = this.checkUrl(CURRENT_USER.profileType, state.url);
            if (!CHECK) {
                this.location.back();
            }
            return CHECK;
        }

    }

    private checkUrl(profileType: ProfileTypesEnum, url: string): boolean {

        const URL_PARTS: string[] = url.split('/');

        for (const URL_PART of URL_PARTS) {
            if (URL_PART === profileType.toLowerCase().replace('_', '-')) {
                return true;
            }
        }

        return false;

    }

}
