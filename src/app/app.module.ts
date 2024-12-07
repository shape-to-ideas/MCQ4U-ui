import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from '../shared/auth.guard';
import { HeaderComponent } from './header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';

const APP_MODULES = [AuthModule, DashboardModule];

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    imports: [
        ...APP_MODULES,
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        NgOptimizedImage,
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
