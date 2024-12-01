import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
    ERROR_MESSAGES,
    FORM_TYPES,
    FormConfigTypes,
    PAGE_ROUTES,
} from '../../../shared/constants';
import { MessageService } from 'primeng/api';
import { RequestsService } from '../../../shared/requests/requests.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.sass',
})
export class RegisterComponent {
    registerFormConfigs: FormConfigTypes[] = [
        {
            name: 'first_name',
            label: 'First Name',
            type: FORM_TYPES.INPUT,
            defaultValue: '',
            validations: [
                {
                    name: 'required',
                    value: true,
                    errorMessage: 'First name is required',
                },
            ],
            className: '',
        },
        {
            name: 'last_name',
            label: 'Last Name',
            type: FORM_TYPES.INPUT,
            defaultValue: '',
            validations: [
                {
                    name: 'required',
                    value: true,
                    errorMessage: 'Last Name is required',
                },
            ],
        },
        {
            name: 'email',
            label: 'Email',
            type: FORM_TYPES.INPUT,
            defaultValue: '',
            validations: [
                {
                    name: 'required',
                    value: true,
                    errorMessage: 'Email is required',
                },
                {
                    name: 'email',
                    value: true,
                    errorMessage: 'Email is incorrect',
                },
            ],
        },
        {
            name: 'phone',
            label: 'Phone',
            type: FORM_TYPES.INPUT,
            defaultValue: '',
            validations: [
                {
                    name: 'required',
                    value: true,
                    errorMessage: 'Phone number is required',
                },
                {
                    name: 'minLength',
                    value: 10,
                    errorMessage: 'Phone number should be of 10 digit',
                },
                {
                    name: 'maxLength',
                    value: 10,
                    errorMessage: 'Phone number should be of 10 digit',
                },
            ],
        },
        {
            name: 'password',
            label: 'Password',
            type: FORM_TYPES.PASSWORD,
            defaultValue: '',
            validations: [
                {
                    name: 'required',
                    value: true,
                    errorMessage: 'Password is required',
                },
                {
                    name: 'minLength',
                    value: 5,
                    errorMessage: 'Password must be at least 5 digits long',
                },
            ],
        },
        {
            name: 'confirm_password',
            label: 'Confirm Password',
            type: FORM_TYPES.PASSWORD,
            defaultValue: '',
            validations: [
                {
                    name: 'required',
                    value: true,
                    errorMessage: 'Password Confirmation is required',
                },
                {
                    name: 'minLength',
                    value: 5,
                    errorMessage: 'Password must be at least 5 digits long',
                },
            ],
        },
        {
            name: 'submit',
            label: 'Submit',
            type: FORM_TYPES.SUBMIT_BUTTON,
        },
    ];

    constructor(
        private router: Router,
        private requestService: RequestsService,
        private messageService: MessageService,
    ) {}

    async submitRegistration(registerFormGroup: FormGroup) {
        if (registerFormGroup.valid) {
            if (
                registerFormGroup.controls['password'].value !==
                registerFormGroup.controls['confirm_password'].value
            ) {
                this.messageService.add({
                    severity: 'error',
                    detail: ERROR_MESSAGES.PASSWORD_MISMATCH,
                });
                return;
            }
            const registerPayload = {
                ...registerFormGroup.value,
                is_admin: Boolean(registerFormGroup.value.is_admin),
            };
            try {
                const registrationResponse =
                    await this.requestService.registerUser(registerPayload);
                console.log(registrationResponse);
            } catch (e) {
                this.messageService.add({
                    severity: 'error',
                    detail: ERROR_MESSAGES.REGISTRATIONS_ERROR,
                });
            }
        }
    }

    navigateToLogin() {
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }
}
