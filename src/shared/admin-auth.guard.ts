import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from './constants';
import { getStorageData } from './utils/storage';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (getStorageData(LOCAL_STORAGE_KEYS.USER)) {
            return true;
        }

        // not admin so redirect to login page with the return url
        this.router.navigate([PAGE_ROUTES.LOGIN], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
