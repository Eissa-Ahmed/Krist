import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { resetPasswordGuard } from '../core/guards/reset-password.guard';
import { TokenExpiredComponent } from './components/token-expired/token-expired.component';
import { tokenExpiredGuard } from '../core/guards/token-expired.guard';
import { resetPasswordResolver } from '../core/guards/reset-password.resolver';
import { registerCanDeActivateGuard } from '../core/guards/register-can-de-activate.guard';
import { loginGuard } from '../core/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register', canDeactivate: [registerCanDeActivateGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, title: 'Forget Password' },
  { path: 'token-expired', component: TokenExpiredComponent, canActivate: [tokenExpiredGuard], title: 'Token Expired' },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [resetPasswordGuard], resolve: { isTokenValid: resetPasswordResolver }, title: 'Reset Password' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
