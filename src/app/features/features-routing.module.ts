import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  {
    path: '', component: FeatureComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: 'our-story', loadChildren: () => import('./our-story/our-story.module').then(m => m.OurStoryModule)
      },
      {
        path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
