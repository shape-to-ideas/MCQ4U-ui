import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  login = new FormGroup({
    phone: new FormControl('123', [Validators.required]),
    password: new FormControl('asfasdf', [Validators.required]),
  });

  submitLogin() {}
}
