import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { FormsComponent } from './components/forms/forms.component';
import { FormArrayComponent } from './components/forms/form-array/form-array.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService, OverlayService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RequestsService } from './requests/requests.service';
import { TopicsStore } from './store/topics.store';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [FormsComponent, FormArrayComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        DynamicDialogModule,
        BrowserAnimationsModule,
    ],
    providers: [
        SharedService,
        MessageService,
        OverlayService,
        RequestsService,
        TopicsStore,
    ],
    exports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FormsComponent,
        FormArrayComponent,
        ToastModule,
        DialogModule,
        ProgressSpinnerModule,
    ],
})
export class SharedModule {}
