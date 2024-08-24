import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: WritableSignal<boolean> = signal(false);
  menuIsOpen: WritableSignal<boolean> = signal(false);
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    this.UserIsAuthenticated();
  }

  UserIsAuthenticated() {
    this.isAuthenticated.set(this.authService.isAuthenticated());
  }

  openMenu() {
    this.menuIsOpen.set(!this.menuIsOpen());
  }
}
