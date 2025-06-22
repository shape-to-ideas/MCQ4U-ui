import { Component, OnInit } from '@angular/core';
import { MESSAGE_SERVICE_SEVERITY, PAGE_ROUTES } from '../../shared/constants';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequestsService } from '../../shared/requests/requests.service';
import { QuestionsResponse } from '../../shared/requests/response.interface';
import { UserStore } from '../../shared/store/user.store';
import { UserSessionData } from '../../shared/interfaces';

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
    showBanner = false;

    constructor(
        private requestsService: RequestsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private userStore: UserStore,
    ) {}

    async ngOnInit() {
        try {
            this.activatedRoute.queryParams.subscribe(
                async (params: Params) => {
                    if (Object.keys(params).length > 1) {
                        await this.handleActiveParam(params);
                    } else {
                        this.showBanner = true;
                    }
                },
            );
        } catch (err: unknown) {
            this.showLoader = false;
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                summary: 'Something went wrong.',
            });
        }

        this.subscribeUserStore();
    }

    redirectToCreateQuestion(): void {
        this.router.navigate([PAGE_ROUTES.QUESTIONS], {
            queryParams: { topicId: this.topicId, topicName: this.topicName },
        });
    }

    redirectToAttemptQuestion(): void {
        this.router.navigate([PAGE_ROUTES.ATTEMPT_QUESTIONS], {
            queryParams: { topicId: this.topicId, topicName: this.topicName },
        });
    }

    subscribeUserStore(): void {
        this.userStore.state$.subscribe((user: UserSessionData) => {
            if (user.id) {
                this.isAdmin = user.is_admin;
            }
        });
    }

    async handleActiveParam(params: Params): Promise<void> {
        try {
            this.topicId = params['topicId'];
            this.topicName = params['topicName'];

            this.showLoader = true;
            const questionsListApiResponse =
                await this.requestsService.getQuestionsByTopicId(this.topicId);
            this.questionsList = questionsListApiResponse.data;
            this.showLoader = false;
        } catch (error) {
            this.showLoader = false;
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                summary: 'Something went wrong.',
            });
        }
    }
}
