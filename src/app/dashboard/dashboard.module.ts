import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { SharedModule } from '../../shared/shared.module';
import { AttemptQuestionsComponent } from './questions/attempt-questions/attempt-questions.component';

@NgModule({
    declarations: [QuestionsComponent, AttemptQuestionsComponent],
    imports: [CommonModule, SharedModule],
})
export class DashboardModule {}
