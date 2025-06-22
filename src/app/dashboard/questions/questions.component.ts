import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    PAGE_ROUTES,
    ERROR_MESSAGES,
    MESSAGE_SERVICE_SEVERITY,
} from '../../../shared/constants';
import { MessageService } from 'primeng/api';
import { RequestsService } from '../../../shared/requests/requests.service';

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

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private requestService: RequestsService,
    ) {
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

                await this.requestService.insertQuestions({
                    data: questionsPayload,
                });
                this.router.navigate([PAGE_ROUTES.DASHBOARD], {
                    queryParams: {
                        topicId: this.topicId,
                        topicName: this.topicName,
                    },
                });
            } catch (e: any) {
                this.messageService.add({
                    severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                    detail: ERROR_MESSAGES.QUESTION_SUBMIT_ERROR,
                });
            }
        }
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
