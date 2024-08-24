import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { SideImageComponent } from './components/side-image/side-image.component';
import { ShareModule } from "../share/share.module";
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { RegisterComponent } from './components/register/register.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ForgetPasswordFormComponent } from './components/forget-password/forget-password-form/forget-password-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './components/reset-password/reset-password-form/reset-password-form.component';
import { TokenExpiredComponent } from './components/token-expired/token-expired.component';
import { LottieComponent } from 'ngx-lottie';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    SideImageComponent,
    RegisterComponent,
    RegisterFormComponent,
    ForgetPasswordComponent,
    ForgetPasswordFormComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    TokenExpiredComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature(AuthEffects),
    LottieComponent
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
