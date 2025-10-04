import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../shared/models/role.enum';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userRole = authService.getUserRole();
  const allowedRoles = route.data['roles'] as Role[];

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
