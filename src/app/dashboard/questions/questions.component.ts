import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    API_PATHS,
    HEADERS,
    PAGE_ROUTES,
    ERROR_MESSAGES,
} from '../../../shared/constants';
import { QuestionsPayload } from '../../../shared/interfaces';
import axios, { AxiosResponse } from 'axios';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../../shared/shared.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.sass',
})
export class QuestionsComponent implements OnInit {
    topicName = '';
    topicId = '';
    formGroup: FormGroup;
    optionsFieldCssString = 'w-80 p-2 my-2 rounded-md border-2 border-black';
    token = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sharedService: SharedService,
        private messageService: MessageService,
    ) {
        this.token = this.sharedService.getUserSessionDetails().token;
        this.formGroup = new FormGroup({
            question: new FormArray([
                new FormGroup({
                    title: new FormControl('', [Validators.required]),
                    optionA: new FormControl('', [Validators.required]),
                    optionB: new FormControl('', [Validators.required]),
                    optionC: new FormControl('', [Validators.required]),
                    optionD: new FormControl('', [Validators.required]),
                    correctAnswer: new FormControl('', [Validators.required]),
                    tags: new FormControl(''),
                }),
            ]),
        });
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(async (params) => {
            this.topicId = params['topicId'];
            this.topicName = params['topicName'];
        });
    }

    get question(): FormArray {
        return this.formGroup?.get('question') as FormArray;
    }

    addQuestion() {
        this.question.push(
            new FormGroup({
                title: new FormControl(''),
                optionA: new FormControl(''),
                optionB: new FormControl(''),
                optionC: new FormControl(''),
                optionD: new FormControl(''),
                correctAnswer: new FormControl(''),
                tags: new FormControl(''),
            }),
        );
    }

    async submitForm() {
        if (this.formGroup.valid) {
            try {
                const questionsPayload = this.formGroup.value.question.map(
                    (value: Record<string, string>) => {
                        return this.mapQuestionsFormPayload(value);
                    },
                );

                await this.insertQuestions({ data: questionsPayload });
                this.router.navigate([PAGE_ROUTES.DASHBOARD], {
                    queryParams: {
                        topicId: this.topicId,
                        topicName: this.topicName,
                    },
                });
            } catch (e: any) {
                this.messageService.add({
                    severity: 'error',
                    detail: ERROR_MESSAGES.QUESTION_SUBMIT_ERROR,
                });
            }
        }
    }

    insertQuestions(questionPayload: {
        data: QuestionsPayload[];
    }): Promise<AxiosResponse<any, any>> {
        return axios.post(
            `${environment.apiUrl}${API_PATHS.QUESTIONS}/create`,
            questionPayload,
            {
                headers: { [HEADERS.Authorization]: this.token },
            },
        );
    }

    mapQuestionsFormPayload(value: Record<string, string>) {
        return {
            title: value['title'].trim(),
            options: [
                {
                    key: 'A',
                    title: value['optionA'],
                },
                {
                    key: 'B',
                    title: value['optionB'],
                },
                {
                    key: 'C',
                    title: value['optionC'],
                },
                {
                    key: 'D',
                    title: value['optionD'],
                },
            ],
            tags: value['tags'],
            is_active: true,
            topic_id: this.topicId,
            answer: value['correctAnswer'],
        };
    }
}
