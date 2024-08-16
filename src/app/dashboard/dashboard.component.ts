import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';
import {
    HEADERS,
    LOCAL_STORAGE_KEYS,
    PAGE_ROUTES,
    UserSessionData,
} from '../../shared/constants';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Questions } from '../../shared/interfaces';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.sass',
})
export class DashboardComponent implements OnInit {
    questionsList: Questions[] = [];
    constructor(
        private sharedService: SharedService,
        private router: Router,
    ) {}

    getUserSessionDetails() {
        const userDetailString = this.sharedService.getStorageData(
            LOCAL_STORAGE_KEYS.USER,
        );
        return JSON.parse(userDetailString) as UserSessionData;
    }

    async ngOnInit() {
        try {
            const topicId = '669bff1ea73507442b6346f9';
            const token = this.getUserSessionDetails().token;

            const questionsListApiPath = `${environment.apiUrl}/api/v1/questions?topic_id=${topicId}`;
            const questionsListApiResponse = await axios.get(
                questionsListApiPath,
                {
                    headers: { [HEADERS.Authorization]: token },
                },
            );
            this.questionsList = questionsListApiResponse.data;
        } catch (err: unknown) {
            alert(err);
        }
    }

    logOut(): void {
        this.sharedService.deleteStorageData(LOCAL_STORAGE_KEYS.USER);
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }

    redirectToCreateQuestion() {
        this.router.navigate([PAGE_ROUTES.QUESTIONS]);
    }
}
