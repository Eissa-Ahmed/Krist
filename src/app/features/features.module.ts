import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { ShareModule } from "../share/share.module";
import { ContactModule } from './contact/contact.module';
import { FeatureComponent } from './feature.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FeatureComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ShareModule,
    ContactModule
  ]
})
export class FeaturesModule { }
