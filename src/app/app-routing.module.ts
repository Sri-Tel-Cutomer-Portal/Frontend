import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { PlansComponent } from './plans/plans.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PhoneNumbersComponent } from './phone-numbers/phone-numbers.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'plans',
    component: PlansComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'phonenumber',
    component: PhoneNumbersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
