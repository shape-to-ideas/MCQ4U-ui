import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { PAGE_ROUTES } from '../shared/constants';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
    { path: '', redirectTo: PAGE_ROUTES.LOGIN, pathMatch: 'full' },
    { path: PAGE_ROUTES.LOGIN, component: LoginComponent },
    { path: PAGE_ROUTES.REGISTER, component: RegisterComponent },
    {
        path: PAGE_ROUTES.DASHBOARD,
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
