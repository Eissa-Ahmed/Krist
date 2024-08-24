import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IResponse } from '../../share/models/iresponse';
import { catchError, map, Observable, of } from 'rxjs';

export const resetPasswordResolver: ResolveFn<boolean> = (route, state): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const token = route.queryParamMap.get('token');
  const email = route.queryParamMap.get('email');

  if (token == null || email == null) {
    return of(false);
  }


  return authService.tokenVerify$(token, email).pipe(
    map((response: IResponse<null>) => {
      if (response.Success) {
        return true;
      } else {
        router.navigate(['/authentication/token-expired'], { state: { open: true } });
        return false
      }
    }),
    catchError(() => {
      router.navigate(['/authentication/token-expired'], { state: { open: true } });
      return of(false);
    })
  );
};
