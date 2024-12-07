import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_ROUTES } from '../../shared/constants';
import { TopicsStore } from '../../shared/store/topics.store';
import { UserStore } from '../../shared/store/user.store';
import { Topic } from '../../shared/requests/response.interface';
import { RequestsService } from '../../shared/requests/requests.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass',
})
export class SidebarComponent implements OnInit {
    title = 'MCQ4U-UI';
    isUserLoggedIn = false;
    topics: Topic[] = [];
    isAdmin = false;
    constructor(
        private topicsStore: TopicsStore,
        private requestsService: RequestsService,
        private router: Router,
        private userStore: UserStore,
    ) {}

    ngOnInit() {
        this.userStore.state$.subscribe(async (user) => {
            if (user.token) {
                this.isUserLoggedIn = true;

                const topics = await this.requestsService.fetchTopicList();
                this.topicsStore.updateState({ topicsList: topics });
            } else {
                this.isUserLoggedIn = false;
            }
        });

        this.topicsStore.state$.subscribe((topicState) => {
            this.topics = topicState.topicsList;
        });
    }

    openAddTopicModal() {
        console.log(' Add topic');
    }

    redirectToTopic(topicId: string, topicName: string) {
        this.router.navigate([PAGE_ROUTES.DASHBOARD], {
            queryParams: { topicId, topicName },
        });
    }
}
