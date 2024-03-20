import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './clients/users/users.component';
import { BaseComponent } from './dashboard/base/base.component';
import { LoginComponent } from './login/login.component';
import { negateAuthGuard } from './guards/negate-auth.guard';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './clients/users/user-list/user-list.component';
import { EditUserComponent } from './clients/users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'app',
    canActivate: [authGuard],
    component: BaseComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'user-list', component:UserListComponent},
      { path: 'edit-user/:id', component:EditUserComponent}

      // { path:'dashboard', component: BaseComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [negateAuthGuard]
  }
  // {
  //   path: 'home',
  //   component:LandingPageComponent,
  //   canActivate: [authGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
