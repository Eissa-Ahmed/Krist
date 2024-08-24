import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AppActions } from './app.all.actions';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private authService: AuthService) {

  }
  ngOnInit(): void {
    // this.store.dispatch(AppActions.applicationSettings());
    // if (this.authService.isAuthenticated())
    //   this.store.dispatch(AppActions.getUser());
  }


}
