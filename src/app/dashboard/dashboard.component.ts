import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '../../shared/constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
    constructor(
        private sharedService: SharedService,
        private router: Router,
    ) {}

    logOut(): void {
        this.sharedService.deleteStorageData(LOCAL_STORAGE_KEYS.USER);
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }
}
