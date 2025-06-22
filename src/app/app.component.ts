import { Component, OnInit } from '@angular/core';
import { UserStore } from '../shared/store/user.store';
import { getStorageData, resolveJwtToken } from '../shared/utils/storage';
import { LOCAL_STORAGE_KEYS } from '../shared/constants';
import { LoginResponse } from '../shared/requests/response.interface';
import { UserSessionData } from '../shared/interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
    constructor(private userStore: UserStore) {}

    ngOnInit() {
        const userStorage = getStorageData(LOCAL_STORAGE_KEYS.USER);
        if (userStorage) {
            const loginDetails = JSON.parse(userStorage) as LoginResponse;
            if (loginDetails.token) {
                const userData = resolveJwtToken(
                    loginDetails.token,
                ) as UserSessionData;
                this.userStore.updateState(userData);
            }
        }
    }
}
