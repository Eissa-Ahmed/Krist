import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = route.queryParamMap.get('token');
  const email = route.queryParamMap.get('email');

  if (token && email)
    return true

  router.navigate(['../'])
  return false;
};
