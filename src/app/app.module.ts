import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';

// *******************************************************************************
// NgBootstrap

import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from 'ngx-clipboard'; 


// Custom daterange picker
import { CustomDaterangePickerComponent } from './_helpers/custom-daterange-picker/custom-daterange-picker.component';
// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { SortablejsModule } from 'ngx-sortablejs';
import {NgxPaginationModule} from 'ngx-pagination';

// *******************************************************************************
// Pages


import { LoginComponent } from './users/login/login.component';
import { ConfirmPageComponent } from './users/confirm-page/confirm-page.component';
import { SetPasswordComponent } from './users/set-password/set-password.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { UserActivitiesComponent } from './users/user-activities/user-activities.component';
import { AuthService } from './_services/auth.services';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { AllProjectsComponent } from './projects/all-projects/all-projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { AuthInterceptorService } from './_helpers/auth-interceptor.service';
import { CustomDateAdapter } from './_helpers/customDateAdaptor';
import { CustomDateParserFormatter } from './_helpers/customDateParserFormatter';
import { TokenExpiredComponent } from './users/token-expired/token-expired.component';
import { DesignationComponent } from './users/designation/designation.component';
import { AddrunlogComponent } from './runlogs-testcases-reports/addrunlog/addrunlog.component';
import { AddTestcaseComponent } from './runlogs-testcases-reports/add-testcase/add-testcase.component';
import { AddReportComponent } from './runlogs-testcases-reports/add-report/add-report.component';
import { ViewReportComponent } from './runlogs-testcases-reports/view-report/view-report.component';
import { ViewTestcaseComponent } from './runlogs-testcases-reports/view-testcase/view-testcase.component';
import { ViewRunlogComponent } from './runlogs-testcases-reports/view-runlog/view-runlog.component';



// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CustomDaterangePickerComponent,

    // Pages
    LoginComponent,
    ConfirmPageComponent,
    SetPasswordComponent,
    AddUserComponent,
    AllUsersComponent,
    UserProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    UserActivitiesComponent,
    DashboardComponent,
    AllProjectsComponent,
    AddProjectComponent,
    ViewProjectComponent,
    TokenExpiredComponent,
    DesignationComponent,
    AddrunlogComponent,
    AddTestcaseComponent,
    AddReportComponent,
    ViewReportComponent,
    ViewTestcaseComponent,
    ViewRunlogComponent,    

  ],

  imports: [
    BrowserModule,
    NgbModule,

    // App
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ClipboardModule,
    ChartsModule,
    SortablejsModule,
    NgxPaginationModule,
  ],

  providers: [
    Title,
    AppService,
    AuthService,
    
    {provide: NgbDateAdapter, useClass: CustomDateAdapter, multi: true},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
