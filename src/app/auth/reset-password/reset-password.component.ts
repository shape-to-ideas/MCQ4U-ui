import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import {
    ERROR_MESSAGES,
    FORM_TYPES,
    FormConfigTypes,
    MESSAGE_SERVICE_SEVERITY,
    PAGE_ROUTES,
    SUCCESS_MESSAGES,
} from '../../../shared/constants';
import { RequestsService } from '../../../shared/requests/requests.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.sass',
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordFormConfigs: FormConfigTypes[] = [
        {
            name: 'new_password',
            label: 'New Password',
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
            label: 'Reset Password',
            type: FORM_TYPES.SUBMIT_BUTTON,
        },
    ];

    token: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private requestsService: RequestsService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token');
    }

    async submitResetPassword(resetPasswordFormGroup: FormGroup) {
        if (!resetPasswordFormGroup.valid || !this.token) {
            return;
        }

        const newPassword = resetPasswordFormGroup.controls['new_password']
            .value as string;
        const confirmPassword = resetPasswordFormGroup.controls[
            'confirm_password'
        ].value as string;

        if (newPassword !== confirmPassword) {
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                detail: ERROR_MESSAGES.PASSWORD_MISMATCH,
            });
            return;
        }

        try {
            await this.requestsService.resetPassword(this.token, newPassword);
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.SUCCESS,
                detail: SUCCESS_MESSAGES.PASSWORD_RESET,
            });
            await this.router.navigate([PAGE_ROUTES.LOGIN]);
        } catch (error) {
            console.error(error);
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                detail: ERROR_MESSAGES.RESET_PASSWORD_ERROR,
            });
        }
    }

    navigateToForgotPassword() {
        this.router.navigate([PAGE_ROUTES.FORGOT_PASSWORD]);
    }
}
