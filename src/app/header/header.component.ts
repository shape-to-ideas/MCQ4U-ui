import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '../../shared/constants';
import { deleteStorageData } from '../../shared/utils/storage';
import { TopicsStore } from '../../shared/store/topics.store';
import { UserStore } from '../../shared/store/user.store';

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
        private userStore: UserStore,
    ) {}

    ngOnInit() {
        this.userStore.state$.subscribe((user) => {
            this.isLoggedIn = !!user.token;
        });
    }

    logOut(): void {
        deleteStorageData(LOCAL_STORAGE_KEYS.USER);
        this.userStore.updateState({ token: '' });
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }

    redirectToHome() {
        this.router.navigate([PAGE_ROUTES.DASHBOARD]);
    }
}
