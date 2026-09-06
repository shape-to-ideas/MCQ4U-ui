import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import {
    FORM_TYPES,
    FormConfigTypes,
    MESSAGE_SERVICE_SEVERITY,
    PAGE_ROUTES,
    SUCCESS_MESSAGES,
} from '../../../shared/constants';
import { RequestsService } from '../../../shared/requests/requests.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.sass',
})
export class ForgotPasswordComponent {
    forgotPasswordFormConfigs: FormConfigTypes[] = [
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
            name: 'submit',
            label: 'Send Reset Link',
            type: FORM_TYPES.SUBMIT_BUTTON,
        },
    ];

    constructor(
        private router: Router,
        private requestsService: RequestsService,
        private messageService: MessageService,
    ) {}

    async submitForgotPassword(forgotPasswordFormGroup: FormGroup) {
        if (!forgotPasswordFormGroup.valid) {
            return;
        }
        const email = forgotPasswordFormGroup.controls['email'].value as string;
        try {
            await this.requestsService.requestPasswordReset(email);
        } catch (error) {
            console.error(error);
        } finally {
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.SUCCESS,
                detail: SUCCESS_MESSAGES.FORGOT_PASSWORD_REQUESTED,
            });
        }
    }

    navigateToLogin() {
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }
}
