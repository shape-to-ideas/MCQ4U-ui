import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '../../shared/constants';
import { deleteStorageData, getStorageData } from '../../shared/utils/storage';
import { TopicsStore } from '../../shared/store/topics.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.sass',
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;
    constructor(
        private topicsStore: TopicsStore,
        private router: Router,
    ) {}

    ngOnInit() {
        const user = getStorageData(LOCAL_STORAGE_KEYS.USER);
        if (user) {
            this.isLoggedIn = true;
        }
        this.topicsStore.state$.subscribe((state) => {
            console.log(state);
        });
    }

    logOut(): void {
        deleteStorageData(LOCAL_STORAGE_KEYS.USER);
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }

    redirectToHome() {
        this.router.navigate([PAGE_ROUTES.DASHBOARD]);
    }
}
