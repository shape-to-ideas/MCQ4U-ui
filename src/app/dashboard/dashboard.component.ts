import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { API_PATHS, HEADERS } from '../../shared/constants';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { Questions } from '../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.sass',
})
export class DashboardComponent implements OnInit {
    questionsList: Questions[] = [];
    topicName = '';

    constructor(
        private sharedService: SharedService,
        private activatedRoute: ActivatedRoute,
    ) {}

    async ngOnInit() {
        try {
            this.activatedRoute.queryParams.subscribe(async (params) => {
                const topicId = params['topicId'];
                this.topicName = params['topicName'];
                const token = this.sharedService.getUserSessionDetails().token;

                const questionsListApiPath = `${environment.apiUrl}${API_PATHS.QUESTIONS}?topic_id=${topicId}`;
                const questionsListApiResponse = await axios.get(
                    questionsListApiPath,
                    {
                        headers: { [HEADERS.Authorization]: token },
                    },
                );
                this.questionsList = questionsListApiResponse.data;
            });
        } catch (err: unknown) {
            console.log(err);
        }
    }
}
