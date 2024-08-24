import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { ApplicationErrorComponent } from './share/components/application-error/application-error.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
  {
    path: 'authentication', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [loginGuard]
  },
  { path: '**', component: ApplicationErrorComponent, title: 'Application Error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
