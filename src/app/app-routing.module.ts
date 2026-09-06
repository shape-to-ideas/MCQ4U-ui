import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { PAGE_ROUTES } from '../shared/constants';
import { RegisterComponent } from './auth/register/register.component';
import { QuestionsComponent } from './dashboard/questions/questions.component';
import { AttemptQuestionsComponent } from './dashboard/questions/attempt-questions/attempt-questions.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
    { path: '', redirectTo: PAGE_ROUTES.LOGIN, pathMatch: 'full' },
    { path: PAGE_ROUTES.LOGIN, component: LoginComponent },
    { path: PAGE_ROUTES.REGISTER, component: RegisterComponent },
    { path: PAGE_ROUTES.FORGOT_PASSWORD, component: ForgotPasswordComponent },
    { path: PAGE_ROUTES.RESET_PASSWORD, component: ResetPasswordComponent },
    {
        path: PAGE_ROUTES.DASHBOARD,
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: PAGE_ROUTES.QUESTIONS,
        component: QuestionsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: PAGE_ROUTES.ATTEMPT_QUESTIONS,
        component: AttemptQuestionsComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
