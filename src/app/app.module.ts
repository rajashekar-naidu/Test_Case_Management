import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClipboardModule } from 'ngx-clipboard'; 

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

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


// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

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
  ],

  providers: [
    Title,
    AppService,
    AuthService,
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
