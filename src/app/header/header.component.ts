import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '../../shared/constants';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;
    constructor(
        private sharedService: SharedService,
        private router: Router,
    ) {}

    ngOnInit() {
        const user = this.sharedService.getStorageData(LOCAL_STORAGE_KEYS.USER);
        if (user) {
            this.isLoggedIn = true;
        }
    }

    logOut(): void {
        this.sharedService.deleteStorageData(LOCAL_STORAGE_KEYS.USER);
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }

    redirectToHome() {
        this.router.navigate([PAGE_ROUTES.DASHBOARD]);
    }
}
