import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { API_PATHS, HEADERS, PAGE_ROUTES } from '../../shared/constants';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { QuestionsResponse } from '../../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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

    constructor(
        private sharedService: SharedService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
    ) {}

    async ngOnInit() {
        try {
            this.activatedRoute.queryParams.subscribe(async (params) => {
                this.topicId = params['topicId'];
                this.topicName = params['topicName'];
                const token = this.sharedService.getUserSessionDetails().token;

                const questionsListApiPath = `${environment.apiUrl}${API_PATHS.QUESTIONS}?topic_id=${this.topicId}`;
                this.showLoader = true;
                const questionsListApiResponse = await axios.get(
                    questionsListApiPath,
                    {
                        headers: { [HEADERS.Authorization]: token },
                    },
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
}
