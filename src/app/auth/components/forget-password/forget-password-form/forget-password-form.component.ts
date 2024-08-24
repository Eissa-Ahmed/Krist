import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthState } from '../../../state/auth.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth.all.actions';
import { selectIsLoadingAuth } from '../../../state/auth.selectors';

@Component({
  selector: 'app-forget-password-form',
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.scss'
})
export class ForgetPasswordFormComponent implements OnInit {
  forgetPasswordForm = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
  })
  isLoading: WritableSignal<boolean> = signal(false);
  option = {
    path: './assets/Lottie/otp.json'
  }
  constructor(private formBuilder: FormBuilder, private store: Store<AuthState>) {

  }
  ngOnInit(): void {
    this.isLoadingTrack();
  }

  getControl(name: string) {
    return this.forgetPasswordForm.get(name);
  }

  isLoadingTrack() {
    this.store.select(selectIsLoadingAuth).subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    })
  }

  onSubmit() {
    this.store.dispatch(AuthActions.forgetPassword({ email: this.forgetPasswordForm.value.email! }));
  }

}
