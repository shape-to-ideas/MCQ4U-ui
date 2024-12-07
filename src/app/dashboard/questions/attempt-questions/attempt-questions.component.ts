import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../../../../shared/requests/requests.service';
import { QuestionAttemptPayload } from '../../../../shared/requests/request.interface';
import { AttemptedQuestionsResponse } from '../../../../shared/requests/response.interface';
import { PAGE_ROUTES } from '../../../../shared/constants';

interface QuestionAttemptFormFields {
    attemptedOption: string;
    questionId: string;
}

@Component({
    selector: 'app-attempt-questions',
    templateUrl: './attempt-questions.component.html',
    styleUrl: './attempt-questions.component.sass',
})
export class AttemptQuestionsComponent implements OnInit {
    topicName = '';
    topicId = '';
    showLoader = false;
    questionsList: AttemptedQuestionsResponse[] = [];
    formGroup: FormGroup | null = null;
    constructor(
        private activatedRoute: ActivatedRoute,
        private requestsService: RequestsService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    ngOnInit() {
        try {
            this.activatedRoute.queryParams.subscribe(async (params) => {
                this.topicId = params['topicId'];
                this.topicName = params['topicName'];

                this.showLoader = true;
                const questionsListApiResponse =
                    await this.requestsService.getAttemptedQuestionsByTopicId(
                        this.topicId,
                    );
                this.questionsList = questionsListApiResponse.data;
                this.createAttemptFormGroup();

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

    get attemptedQuestionFormArray(): FormArray {
        return this.formGroup?.get('question') as FormArray;
    }

    createAttemptFormGroup() {
        this.formGroup = new FormGroup({
            question: new FormArray(
                this.questionsList.map(
                    (question: AttemptedQuestionsResponse) => {
                        const selectedValue =
                            question.attempted_questions[0]?.option ?? '';
                        return new FormGroup({
                            questionId: new FormControl(question._id.$oid),
                            attemptedOption: new FormControl(
                                {
                                    value: selectedValue,
                                    disabled: Boolean(selectedValue),
                                },
                                [Validators.required],
                            ),
                        });
                    },
                ),
            ),
        });
    }

    async submitForm() {
        this.formGroup?.markAsDirty();
        if (this.formGroup?.valid) {
            const questionsValue: QuestionAttemptFormFields[] =
                this.formGroup.get('question')?.value;
            const submissionPayload: QuestionAttemptPayload[] = questionsValue
                .map((question: QuestionAttemptFormFields) => {
                    return {
                        question_id: question.questionId,
                        option: question.attemptedOption,
                    };
                })
                .filter((question: QuestionAttemptPayload) => question.option);
            // await this.requestsService.attemptQuestions(submissionPayload);
            await this.router.navigate([PAGE_ROUTES.DASHBOARD], {
                queryParams: {
                    topicId: this.topicId,
                    topicName: this.topicName,
                },
            });
        }
    }
}
