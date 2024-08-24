import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthState } from '../../../state/auth.reducer';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth.all.actions';
import { FormBuilder, Validators } from '@angular/forms';
import { selectIsLoadingAuth } from '../../../state/auth.selectors';
import { Register } from '../../../../share/models/Register';
import { AppState } from '../../../../app.reducer';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  isLoading: WritableSignal<boolean> = signal(false);
  loginForm = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }]
  })
  option = {
    path: './assets/Lottie/login.json'
  }

  constructor(private authService: AuthService, private store: Store<AuthState>, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.isLoadingTrack();
  }

  onSubmit() {
    this.store.dispatch(AuthActions.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }));
  }

  isLoadingTrack() {
    this.store.select(selectIsLoadingAuth).subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    })
  }

  getControl(name: string) {
    return this.loginForm.get(name);
  }

}
