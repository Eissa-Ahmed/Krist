import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../core/services/auth.service";
import { AuthActions } from "./auth.all.actions";
import { catchError, concatMap, exhaustMap, map, of, tap, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import swal from 'sweetalert2'
import lottie from 'lottie-web';
import { AppState } from "../../app.reducer";
import { Store } from "@ngrx/store";
import { AppActions } from "../../app.all.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private appStore: Store<AppState>,
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),

    exhaustMap((action) => this.authService.login$(action.email, action.password).pipe(
      tap((response) => {
        localStorage.setItem('token', response.Data!.Token!);
      }),
      map((response) => {
        this.appStore.dispatch(AppActions.getUser())
        this.toastr.success(response.Message);
        this.router.navigate(['/home']);
        return AuthActions.loginSuccess({
          authenticationModel: response.Data!
        })
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.Data.Message, '', { timeOut: 3000 });
        return of(AuthActions.loginError({ error: error.message }))
      })
    ))
  ));

  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    concatMap((action) => this.authService.register$(action.register).pipe(
      map((response) => {
        if (response.Success) {
          this.toastr.success(response.Message);
          this.router.navigate(['/authentication/login']);
          return AuthActions.registerSuccess({ message: response.Message })
        } else {
          this.toastr.error(response.Message, '', { timeOut: 3000 });
          return AuthActions.registerError({ error: response.Message });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.Data.Message, '', { timeOut: 3000 });
        return of(AuthActions.registerError({ error: error.message }))
      })
    ))
  ));


  forgetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.forgetPassword),
    concatMap((action) => this.authService.forgetPassword$(action.email).pipe(
      map((response) => {
        if (response.Success) {
          this.SendEmailAlert(action.email);
          return AuthActions.forgetPasswordSuccess({ message: response.Message })
        } else {
          this.toastr.error(response.Message, '', { timeOut: 3000 });
          return AuthActions.forgetPasswordError({ error: response.Message });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.error(error.error.Message, '', { timeOut: 3000 });
        return of(AuthActions.forgetPasswordError({ error: error.error.Message }))
      })
    ))
  ));


  SendEmailAlert(email: string) {
    swal.fire({
      html: `
        <div id="lottie-container" style="width: 100px; height: 100px; margin: auto;"></div>
        <p>We sent you a message containing a link to reset the password to <b>${email}</b></p>`,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#800000',
      showCancelButton: true,
      confirmButtonText: 'Go to gmail',
      confirmButtonColor: '#131118',
      allowOutsideClick: false,
      didOpen: () => {
        lottie.loadAnimation({
          container: document.getElementById('lottie-container')!,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: './assets/Lottie/send-email.json'
        });
      },
      preConfirm: () => {
        window.location.href = 'https://mail.google.com/';
      }
    }).then((result) => {
      if (result.isDismissed) {
        this.router.navigate(['/authentication/login']);
      }
    });
  }

  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.resetPassword),
    concatMap((action) => this.authService.resetPassword$(action.model).pipe(
      map((response) => {
        if (response.Success) {
          this.toastr.success(response.Message);
          this.router.navigate(['/authentication/login']);
          return AuthActions.resetPasswordSuccess({ message: response.Message })
        } else {
          this.router.navigate(['/authentication/token-expired'], { state: { open: true } });
          return AuthActions.resetPasswordError({ error: response.Message });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['/authentication/token-expired'], { state: { open: true } });
        return of(AuthActions.resetPasswordError({ error: error.message }))
      })
    ))
  ));

}
