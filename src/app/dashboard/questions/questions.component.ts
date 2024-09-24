import { Component, OnInit } from '@angular/core';
import { FORM_TYPES, FormConfigTypes } from '../../../shared/constants';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.sass',
})
export class QuestionsComponent implements OnInit {
    topicName = '';
    topicId = '';
    currentQuestionIndex = 0;
    questionsFields: FormConfigTypes = {
        name: `Question ${this.currentQuestionIndex}`,
        label: '',
        index: 0,
        type: 'formArrayRoot',
        isFormArray: true,
        formArray: [
            {
                name: 'title',
                label: 'Title',
                type: FORM_TYPES.TEXTAREA,
                defaultValue: '',
                validations: [
                    {
                        name: 'required',
                        value: true,
                        errorMessage: 'Question is required',
                    },
                ],
            },
            {
                name: 'option_a',
                label: 'A',
                type: FORM_TYPES.INPUT,
                defaultValue: '',
                validations: [
                    {
                        name: 'required',
                        value: true,
                        errorMessage: 'Phone number is required',
                    },
                ],
            },
            {
                name: 'option_b',
                label: 'B',
                type: FORM_TYPES.INPUT,
                defaultValue: '',
                validations: [
                    {
                        name: 'required',
                        value: true,
                        errorMessage: 'Phone number is required',
                    },
                ],
            },
            {
                name: 'option_c',
                label: 'C',
                type: FORM_TYPES.INPUT,
                defaultValue: '',
                validations: [
                    {
                        name: 'required',
                        value: true,
                        errorMessage: 'Phone number is required',
                    },
                ],
            },
            {
                name: 'option_d',
                label: 'D',
                type: FORM_TYPES.INPUT,
                defaultValue: '',
                validations: [
                    {
                        name: 'required',
                        value: true,
                        errorMessage: 'Phone number is required',
                    },
                ],
            },
        ],
    };
    formBaseValues = {};

    createQuestionFormConfigs: FormConfigTypes[] = [
        {
            index: 100,
            name: 'submit',
            label: 'Submit',
            type: FORM_TYPES.SUBMIT_BUTTON,
        },
    ];
    protected readonly formTypes = FORM_TYPES;

    constructor(private activatedRoute: ActivatedRoute) {
        this.addQuestionField();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(async (params) => {
            this.topicId = params['topicId'];
            this.topicName = params['topicName'];
        });
    }

    addQuestionField() {
        const questionFields: FormConfigTypes = {
            ...this.questionsFields,
            name: `Question ${++this.currentQuestionIndex}`,
        };
        this.createQuestionFormConfigs.push(questionFields);
    }

    submitForm(questionsFormGroup: FormGroup) {
        if (questionsFormGroup.valid) {
            console.log(questionsFormGroup.value);
        }
    }
}
