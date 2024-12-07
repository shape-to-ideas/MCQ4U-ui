import { Component, OnInit } from '@angular/core';
import { PAGE_ROUTES } from '../../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequestsService } from '../../shared/requests/requests.service';
import { QuestionsResponse } from '../../shared/requests/response.interface';
import { TopicsStore } from '../../shared/store/topics.store';
import { UserStore } from '../../shared/store/user.store';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.sass',
})
export class DashboardComponent implements OnInit {
    questionsList: QuestionsResponse[] = [];
    topicName = '';
    topicId = '';
    showLoader = false;
    isAdmin = false;

    constructor(
        private requestsService: RequestsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
    ) {}

    async ngOnInit() {
        try {
            this.activatedRoute.queryParams.subscribe(async (params) => {
                this.topicId = params['topicId'];
                this.topicName = params['topicName'];

                this.showLoader = true;
                const questionsListApiResponse =
                    await this.requestsService.getQuestionsByTopicId(
                        this.topicId,
                    );
                this.questionsList = questionsListApiResponse.data;
                this.showLoader = false;
            });
        } catch (err: unknown) {
            this.showLoader = false;
            this.messageService.add({
                severity: 'error',
                summary: 'Something went wrong.',
            });
        }
    }

    redirectToCreateQuestion() {
        this.router.navigate([PAGE_ROUTES.QUESTIONS], {
            queryParams: { topicId: this.topicId, topicName: this.topicName },
        });
    }

    redirectToAttemptQuestion() {
        this.router.navigate([PAGE_ROUTES.ATTEMPT_QUESTIONS], {
            queryParams: { topicId: this.topicId, topicName: this.topicName },
        });
    }
}
