import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { SharedService } from './shared.service';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private sharedService: SharedService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sharedService.getStorageData(LOCAL_STORAGE_KEYS.USER)) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate([PAGE_ROUTES.LOGIN], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
