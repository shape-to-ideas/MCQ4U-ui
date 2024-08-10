import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'MCQ4U-UI';
  login = new FormGroup({
    phone: new FormControl('123', [Validators.required]),
    password: new FormControl('asfasdf', [Validators.required]),
  });
}
