import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [SharedService],
    exports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class SharedModule {}
