import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';

// *******************************************************************************
// Pages

import { LoginComponent } from './users/login/login.component';
import { ConfirmPageComponent } from './users/confirm-page/confirm-page.component';
import { SetPasswordComponent } from './users/set-password/set-password.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { UserActivitiesComponent } from './users/user-activities/user-activities.component';


// *******************************************************************************
// Routes

const routes: Routes = [
  {path:'login', component:LoginComponent}, // canActivate:[AuthGuard]
  {path:'confirm-page', component:ConfirmPageComponent},
  {path:'set-password', component:SetPasswordComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'user-accounts', component: Layout1Component, children: [
    { path: '', component: AllUsersComponent },
  ]},

  { path: 'user-accounts/add-user', component: Layout2Component, children: [
    { path: '', component: AddUserComponent },
  ]},

  { path: 'user-accounts/profile', component: Layout2Component, children: [
    { path: '', component: UserProfileComponent }, //id here
  ]},

  { path: 'user-accounts/profile/edit', component: Layout2Component, children: [
    { path: '', component: EditProfileComponent }, //id here
  ]},

  { path: 'user-accounts/profile/edit/password', component: Layout2Component, children: [
    { path: '', component: ChangePasswordComponent }, //id here
  ]},

  { path: 'user-accounts/profile/activities', component: Layout2Component, children: [
    { path: '', component: UserActivitiesComponent }, //id here
  ]},



  // 404 Not Found page
  { path: '**', component: NotFoundComponent }

];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
