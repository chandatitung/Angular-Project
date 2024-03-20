import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);

  if (localStorage.getItem('username') && localStorage.getItem('password')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};