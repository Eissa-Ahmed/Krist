import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppService } from "./core/services/app.service";
import { AuthActions } from "./auth/state/auth.all.actions";
import { applicationSettings, getUser } from './app.actions';
import { AppActions } from "./app.all.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "./core/services/auth.service";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
    private appService: AppService,
    private authService: AuthService,
    private router: Router) {
  }

  applicationSettings$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.applicationSettings),
    exhaustMap(() => this.appService.getApplicationSettings().pipe(
      map((response) => AppActions.applicationSettingsSuccess({ settings: response.Data! })),
    )),
    catchError((error: HttpErrorResponse) => {
      this.router.navigate(['**']);
      return of(AppActions.applicationSettingsError({ error: error.message }))
    })
  ))

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.getUser),
    exhaustMap(() => this.authService.getUser$().pipe(
      map((response) => AppActions.getUserSuccess({ user: response.Data! })),
    )),
    catchError((error: HttpErrorResponse) => {
      this.router.navigate(['**']);
      return of(AppActions.getUserError({ error: error.message }))
    })
  ))
}
