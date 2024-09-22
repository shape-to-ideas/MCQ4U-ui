import { Component } from '@angular/core';
import { FORM_TYPES, FormConfigTypes } from '../../../shared/constants';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrl: './questions.component.sass',
})
export class QuestionsComponent {
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

    constructor() {
        this.addQuestionField();
    }

    addQuestionField() {
        const questionFields: FormConfigTypes = {
            ...this.questionsFields,
            name: `Question ${++this.currentQuestionIndex}`,
        };
        this.createQuestionFormConfigs.push(questionFields);
    }

    protected readonly formTypes = FORM_TYPES;
}
