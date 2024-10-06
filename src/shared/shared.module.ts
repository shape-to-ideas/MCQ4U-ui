import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { FormsComponent } from './components/forms/forms.component';
import { FormArrayComponent } from './components/forms/form-array/form-array.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    declarations: [FormsComponent, FormArrayComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        BrowserAnimationsModule,
    ],
    providers: [SharedService, MessageService],
    exports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FormsComponent,
        FormArrayComponent,
        ToastModule,
        ProgressSpinnerModule,
    ],
})
export class SharedModule {}
