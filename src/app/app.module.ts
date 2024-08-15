import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from '../shared/auth.guard';

const APP_MODULES = [AuthModule, DashboardModule];

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [...APP_MODULES, BrowserModule, AppRoutingModule, SharedModule],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
