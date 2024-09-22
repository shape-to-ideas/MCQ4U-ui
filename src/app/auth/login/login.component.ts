import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import {
    API_PATHS,
    FORM_TYPES,
    FormConfigTypes,
    LOCAL_STORAGE_KEYS,
    PAGE_ROUTES,
} from '../../../shared/constants';
import { SharedService } from '../../../shared/shared.service';

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
        private sharedService: SharedService,
    ) {}

    ngOnInit(): void {
        if (this.sharedService.getStorageData(LOCAL_STORAGE_KEYS.USER)) {
            this.router.navigate([PAGE_ROUTES.DASHBOARD]);
        }
    }

    async submitLogin(loginFormGroup: FormGroup) {
        if (loginFormGroup.valid) {
            const loginUrl = `${environment.apiUrl}${API_PATHS.LOGIN}`;
            const loginResponse = await axios.post(loginUrl, {
                phone: loginFormGroup.controls['phone'].value,
                password: loginFormGroup.controls['password'].value,
            });
            if (loginResponse.data) {
                this.sharedService.setStorageData(
                    LOCAL_STORAGE_KEYS.USER,
                    JSON.stringify(loginResponse.data),
                );
                await this.router.navigate([PAGE_ROUTES.DASHBOARD]);
            } else if (loginResponse.status < 200) {
                alert('Error in login API'); /**@TODO implement toast*/
            }
        }
    }

    navigateToRegister() {
        this.router.navigate([PAGE_ROUTES.REGISTER]);
    }
}
