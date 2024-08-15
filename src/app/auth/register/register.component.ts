import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '../../../shared/constants';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.sass',
})
export class RegisterComponent {
    registerFormGroup = new FormGroup({
        lastName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
        confirmPassword: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
        ]),
        isAdmin: new FormControl('', [Validators.required]),
    });

    constructor(
        private router: Router,
        private sharedService: SharedService,
    ) {}

    async submitRegistration() {
        this.registerFormGroup.markAsDirty();
        console.log('----', this.registerFormGroup.value);
        if (this.registerFormGroup.valid) {
            const registerUrl = `${environment.apiUrl}/api/v1/user/register`;
            const loginResponse = await axios.post(
                registerUrl,
                this.registerFormGroup.value,
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
