import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTES } from '../shared/constants';
import { Router } from '@angular/router';
import { getUserSessionDetails } from '../shared/utils/storage';
import { RequestsService } from '../shared/requests/requests.service';
import { Topic } from '../shared/requests/response.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
    title = 'MCQ4U-UI';
    isUserLoggedIn = false;
    topics: Topic[] = [];
    isAdmin = false;
    constructor(
        private router: Router,
        private requestsService: RequestsService,
    ) {}

    ngOnInit() {
        const user = getUserSessionDetails();
        if (user?.token) {
            this.isUserLoggedIn = true;
            this.getTopicsList();
        }
    }

    openAddTopicModal() {
        console.log(' Add topic');
    }

    async getTopicsList() {
        this.topics = await this.requestsService.fetchTopicList();
    }

    redirectToTopic(topicId: string, topicName: string) {
        this.router.navigate([PAGE_ROUTES.DASHBOARD], {
            queryParams: { topicId, topicName },
        });
    }
}
