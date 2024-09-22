import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { FormsComponent } from './components/forms/forms.component';
import { FormArrayComponent } from './components/forms/form-array/form-array.component';

@NgModule({
    declarations: [FormsComponent, FormArrayComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [SharedService],
    exports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        FormsComponent,
        FormArrayComponent,
    ],
})
export class SharedModule {}
