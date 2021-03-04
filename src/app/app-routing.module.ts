import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';
// import { Layout2Component } from './layout/layout-2/layout-2.component';

// *******************************************************************************
// Pages

import { LoginComponent } from './users/login/login.component';
import { ConfirmPageComponent } from './users/confirm-page/confirm-page.component';
// import { SetPasswordComponent } from './users/set-password/set-password.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { UserActivitiesComponent } from './users/user-activities/user-activities.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AllProjectsComponent } from './projects/all-projects/all-projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { PickersComponent } from './_helpers/pickers/pickers.component';


// *******************************************************************************
// Routes

const routes: Routes = [
  {path:'login', component:LoginComponent}, // canActivate:[AuthGuard]
  {path:'confirm-page', component:ConfirmPageComponent},
 // {path:'set-password', component:SetPasswordComponent},
   {path:'datepicker', component:PickersComponent},

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'dashboard', component: Layout1Component, children: [
    { path: '', component: DashboardComponent },
  ]},

  { path: 'users', component: Layout1Component, children: [
    { path: '', component: AllUsersComponent },
  ]},

  { path: 'users/add-user', component: Layout1Component, children: [
    { path: '', component: AddUserComponent },
  ]},

  { path: 'users/profile/:id', component: Layout1Component, children: [
    { path: '', component: UserProfileComponent }, //id here
  ]},

  { path: 'users/profile/edit/:id', component: Layout1Component, children: [
    { path: '', component: EditProfileComponent }, //id here
  ]},

  { path: 'users/profile/edit/password/:id', component: Layout1Component, children: [
    { path: '', component: ChangePasswordComponent }, //id here
  ]},

  { path: 'users/profile/activities/:id', component: Layout1Component, children: [
    { path: '', component: UserActivitiesComponent }, //id here
  ]},

  { path: 'projects', component: Layout1Component, children: [
    { path: '', component: AllProjectsComponent },
  ]},

  { path: 'projects/add-project', component: Layout1Component, children: [
    { path: '', component: AddProjectComponent },
  ]},

  { path: 'projects/view', component: Layout1Component, children: [
    { path: '', component: ViewProjectComponent },
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
