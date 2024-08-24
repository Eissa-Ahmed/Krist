import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../share/validators/password.validator';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../state/auth.reducer';
import { selectIsLoadingAuth } from '../../../state/auth.selectors';
import { ActivatedRoute } from '@angular/router';
import { AuthActions } from '../../../state/auth.all.actions';
import { ResetPasswordModel } from '../../../../share/models/ResetPasswordModel';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.scss'
})
export class ResetPasswordFormComponent implements OnInit {

  resetPasswordForm = this.formBuilder.group({
    password: ['', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(25)] }],
    confirmPassword: ['']
  }, { validators: [passwordValidator] })
  isLoading: WritableSignal<boolean> = signal(false)
  email: WritableSignal<string | null> = signal(null)
  token: WritableSignal<string | null> = signal(null)

  option = {
    path: './assets/Lottie/reset-password.json'
  }
  constructor(private formBuilder: FormBuilder, private store: Store<AuthState>, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.isLoadingTrack();
    this.getQueryParams();
  }

  onSubmit() {
    this.store.dispatch(AuthActions.resetPassword({ model: new ResetPasswordModel(this.token()!, this.resetPasswordForm.value.password!, this.email()!) }));
  }

  isLoadingTrack() {
    this.store.select(selectIsLoadingAuth).subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    })
  }
  getQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.email.set(params['email']);
      this.token.set(params['token']);
    })
  }
  getControl(name: string) {
    return this.resetPasswordForm.get(name);
  }
}
