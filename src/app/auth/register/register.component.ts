import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import {
    API_PATHS,
    ERROR_MESSAGES,
    FORM_TYPES,
    FormConfigTypes,
    LOCAL_STORAGE_KEYS,
    PAGE_ROUTES,
} from '../../../shared/constants';
import { environment } from '../../../environments/environment';
import axios from 'axios';
import { MessageService } from 'primeng/api';

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
        private sharedService: SharedService,
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
            }
            const registerUrl = `${environment.apiUrl}${API_PATHS.REGISTER}`;
            const loginResponse = await axios.post(
                registerUrl,
                registerFormGroup.value,
            );
            if (loginResponse.data) {
                this.sharedService.setStorageData(
                    LOCAL_STORAGE_KEYS.USER,
                    JSON.stringify(loginResponse),
                );
                await this.router.navigate([PAGE_ROUTES.DASHBOARD]);
            } else if (loginResponse.status < 200) {
                alert('Error in login API'); /**@TODO implement toast*/
            }
        }
    }

    navigateToLogin() {
        this.router.navigate([PAGE_ROUTES.LOGIN]);
    }
}
