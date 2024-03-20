import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { UsersComponent } from './clients/users/users.component';
import { BaseComponent } from './dashboard/base/base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormTableComponent } from './dashboard/form-table/form-table.component';
import { UserListComponent } from './clients/users/user-list/user-list.component';
import { EditUserComponent } from './clients/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    UsersComponent,
    BaseComponent,
    LoginComponent,
    LandingPageComponent,
    FormTableComponent,
    UserListComponent,
    EditUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
