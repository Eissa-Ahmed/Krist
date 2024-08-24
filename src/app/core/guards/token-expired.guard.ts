import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tokenExpiredGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const navigation = router.getCurrentNavigation();
  const stateRouter = navigation?.extras?.state as { open: boolean };
  if (!stateRouter?.open) {
    router.navigate(['../']);
    return false;
  }

  return true;
};
