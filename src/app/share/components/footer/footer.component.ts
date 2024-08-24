import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { appSelector, appSelector_SocialMedia } from '../../../app.selector';
import { AppState } from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { IApplicationSettings, ISocialMediaAccounts } from '../../models/iapplication-settings';
import { ShareActions } from '../state/share.all.action';
import { appSelector_isLoading } from '../state/share.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  applicationSettings?: IApplicationSettings | null;
  email?: string;
  isLoading: WritableSignal<boolean> = signal(false)
  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.store.select(appSelector).subscribe((applicationSettings) => {
      this.applicationSettings = applicationSettings.settings
    })
    this.store.select(appSelector_isLoading).subscribe((isLoading) => {
      this.isLoading.set(isLoading)
    })
  }
  isEmailValid(): boolean {
    if (this.email === undefined) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email!);
  }
  onSubscribe() {
    if (this.email)
      this.store.dispatch(ShareActions.userSubscription({ email: this.email }))
  }
}
