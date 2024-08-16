import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '../../../shared/constants';
import { SharedService } from '../../../shared/shared.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
    loginFormGroup = new FormGroup({
        phone: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
    });

    constructor(
        private router: Router,
        private sharedService: SharedService,
    ) {}

    ngOnInit(): void {
        if (this.sharedService.getStorageData(LOCAL_STORAGE_KEYS.USER)) {
            this.router.navigate([PAGE_ROUTES.DASHBOARD]);
        }
    }

    async submitLogin() {
        this.loginFormGroup.markAsDirty();
        if (this.loginFormGroup.valid) {
            const loginUrl = `${environment.apiUrl}/api/v1/user/login`;
            const loginResponse = await axios.post(loginUrl, {
                phone: this.loginFormGroup.controls.phone.value,
                password: this.loginFormGroup.controls.password.value,
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
