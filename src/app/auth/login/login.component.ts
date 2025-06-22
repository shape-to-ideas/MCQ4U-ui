import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import {
    FORM_TYPES,
    FormConfigTypes,
    LOCAL_STORAGE_KEYS,
    MESSAGE_SERVICE_SEVERITY,
    PAGE_ROUTES,
} from '../../../shared/constants';
import { getStorageData } from '../../../shared/utils/storage';
import { RequestsService } from '../../../shared/requests/requests.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
    loginFormConfigs: FormConfigTypes[] = [
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
            name: 'submit',
            label: 'Submit',
            type: FORM_TYPES.SUBMIT_BUTTON,
        },
    ];

    constructor(
        private router: Router,
        private requestsService: RequestsService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        if (getStorageData(LOCAL_STORAGE_KEYS.USER)) {
            this.router.navigate([PAGE_ROUTES.DASHBOARD]);
        }
    }

    async submitLogin(loginFormGroup: FormGroup) {
        try {
            if (loginFormGroup.valid) {
                const loginPayload = {
                    phone: loginFormGroup.controls['phone'].value as string,
                    password: loginFormGroup.controls['password']
                        .value as string,
                };
                await this.requestsService.userLogin(loginPayload);
                await this.router.navigate([PAGE_ROUTES.DASHBOARD]);
            }
        } catch (err) {
            this.messageService.add({
                severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                summary: err.message,
            });
        }
    }

    navigateToRegister() {
        this.router.navigate([PAGE_ROUTES.REGISTER]);
    }
}
