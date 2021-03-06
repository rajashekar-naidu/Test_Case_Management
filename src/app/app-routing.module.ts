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
import { TokenExpiredComponent } from './users/token-expired/token-expired.component';
import { DesignationComponent } from './users/designation/designation.component';
import { AddrunlogComponent } from './runlogs-testcases-reports/addrunlog/addrunlog.component';
import { AddTestcaseComponent } from './runlogs-testcases-reports/add-testcase/add-testcase.component';
import { AddReportComponent } from './runlogs-testcases-reports/add-report/add-report.component';
import { ViewRunlogComponent } from './runlogs-testcases-reports/view-runlog/view-runlog.component';
import { ViewTestcaseComponent } from './runlogs-testcases-reports/view-testcase/view-testcase.component';
import { ViewReportComponent } from './runlogs-testcases-reports/view-report/view-report.component';
import { AllFeaturesComponent } from './features/all-features/all-features.component';
import { AllRolesComponent } from './role/all-roles/all-roles.component';
import { AddFeatureComponent } from './features/add-feature/add-feature.component';
import { UpdateFeatureComponent } from './features/update-feature/update-feature.component';
import { ViewFeatureComponent } from './features/view-feature/view-feature.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { BlockedComponent } from './users/blocked/blocked.component';


// *******************************************************************************
// Routes

const routes: Routes = [
  {path:'login', component:LoginComponent}, // canActivate:[AuthGuard]
  {path:'confirm-page', component:ConfirmPageComponent},
  {path:'designation', component:DesignationComponent},
 {path:'token-expired-page', component:TokenExpiredComponent},
 {path:'blocked', component:BlockedComponent},

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
    { path: '', component: ViewProjectComponent }, //project id
  ]},

  { path: 'projects/add-runlog', component: Layout1Component, children: [
    { path: '', component: AddrunlogComponent },
  ]},
  
  { path: 'projects/add-testcase', component: Layout1Component, children: [
    { path: '', component: AddTestcaseComponent },
  ]},

  { path: 'projects/add-report', component: Layout1Component, children: [
    { path: '', component: AddReportComponent },
  ]},

  { path: 'projects/view/view-runlog', component: Layout1Component, children: [
    { path: '', component: ViewRunlogComponent }, //runlog id
  ]},
  
  { path: 'projects/view/view-testcase', component: Layout1Component, children: [
    { path: '', component: ViewTestcaseComponent }, //testcase id
  ]},

  { path: 'projects/view/view-report', component: Layout1Component, children: [
    { path: '', component: ViewReportComponent }, //report id
  ]},

  { path: 'features', component: Layout1Component, children: [
    { path: '', component: AllFeaturesComponent },
  ]},

  { path: 'features/add-feature', component: Layout1Component, children: [
    { path: '', component: AddFeatureComponent },
  ]},

  { path: 'features/view-feature/:id', component: Layout1Component, children: [
    { path: '', component: ViewFeatureComponent }, //featureid
  ]},

  { path: 'features/view-feature/update/:id', component: Layout1Component, children: [
    { path: '', component: UpdateFeatureComponent }, //featureid
  ]},


  { path: 'roles', component: Layout1Component, children: [
    { path: '', component: AllRolesComponent },
  ]},

  { path: 'roles/add-role', component: Layout1Component, children: [
    { path: '', component: AddRoleComponent },
  ]},

  { path: 'roles/view-role/:id', component: Layout1Component, children: [
    { path: '', component: ViewRoleComponent}, //role id
  ]},

  { path: 'roles/view-role/update/:id', component: Layout1Component, children: [
    { path: '', component: UpdateRoleComponent}, //role-id
  ]},

  {path:'server-error', component:ServerErrorComponent},

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
