import { Component, OnInit } from '@angular/core';
import {
    API_PATHS,
    HEADERS,
    LOCAL_STORAGE_KEYS,
    PAGE_ROUTES,
    TopicsResponse,
} from '../shared/constants';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import axios from 'axios';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
    title = 'MCQ4U-UI';
    isUserLoggedIn = false;
    topics: TopicsResponse[] = [];
    constructor(
        private router: Router,
        private sharedService: SharedService,
    ) {}

    ngOnInit() {
        const user = this.sharedService.getStorageData(LOCAL_STORAGE_KEYS.USER);
        if (user) {
            this.isUserLoggedIn = true;
            this.getTopicsList();
        }
    }

    openAddTopicModal() {
        console.log(' Add topic');
    }

    getTopicsList() {
        const token = this.sharedService.getUserSessionDetails().token;
        axios
            .get(`${environment.apiUrl}${API_PATHS.TOPICS}`, {
                headers: { [HEADERS.Authorization]: token },
            })
            .then((response) => {
                this.topics = response.data;
            });
    }

    redirectToTopic(topicId: string, topicName: string) {
        this.router.navigate([PAGE_ROUTES.DASHBOARD], {
            queryParams: { topicId, topicName },
        });
    }
}
