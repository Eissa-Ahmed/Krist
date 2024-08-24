import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer, AppState } from './app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from './core/app.title';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { AppEffects } from './app.effects';
import { AppActions } from './app.all.actions';
import { AuthService } from './core/services/auth.service';
import { filter, lastValueFrom, take } from 'rxjs';
import { appSelector } from './app.selector';

export function initializeApp(store: Store<AppState>, authService: AuthService) {
  return (): Promise<void> => {
    return new Promise((resolve) => {
      store.dispatch(AppActions.applicationSettings());
      if (authService.isAuthenticated())
        store.dispatch(AppActions.getUser());

      Promise.all([
        lastValueFrom(store.select(appSelector).pipe(filter(data => data.settings !== null), take(1))),
        authService.isAuthenticated() ? lastValueFrom(store.select(appSelector).pipe(filter(data => data.user !== null), take(1))) : Promise.resolve(),
      ]).then(() => {
        resolve();
      });
    });
  };
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    StoreModule.forRoot({ app: appReducer }),// this for store NGRX
    EffectsModule.forRoot([AppEffects]), // effects for work with store NGRX
    StoreDevtoolsModule.instrument({ maxAge: 25 }), // to enable devtools for store NGRX
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Store<AppState>, AuthService],
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideLottieOptions({
      player: () => player,
    }),
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
