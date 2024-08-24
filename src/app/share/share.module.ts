import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/header/menu/menu.component';
import { ApplicationErrorComponent } from './components/application-error/application-error.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShareEffects } from './components/state/share.effects';
import { shareReducer } from './components/state/share.reducer';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ApplicationErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    StoreModule.forFeature('share', shareReducer),
    EffectsModule.forFeature(ShareEffects),
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class ShareModule { }
