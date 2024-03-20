import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const negateAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(localStorage.getItem('username') && localStorage.getItem('password')) {
    router.navigate(['/app']);
    return false;
  }
  return true;
};