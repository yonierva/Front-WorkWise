import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthPersonaService } from '../services/auth-personsa.service';

export const authPersonaGuard: CanActivateFn = () => {
  const authPersonaService = inject(AuthPersonaService);
  const router = inject(Router);

  const token = authPersonaService.getToken();
  if (token) {
    return true;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión como persona para acceder a esta sección.',
      confirmButtonText: 'Aceptar'
    }).then(() => {router.navigate(['/loginPersona']);});
    return false;
  }
};
