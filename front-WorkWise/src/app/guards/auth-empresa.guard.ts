import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthEmpresaService } from '../services/auth-empresa.service';

export const authEmpresaGuard: CanActivateFn = () => {
  const authEmpresaService = inject(AuthEmpresaService);
  const router = inject(Router);

  const token = authEmpresaService.getToken();
  if (token) {
    return true;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión como empresa para acceder a esta sección.',
      confirmButtonText: 'Aceptar'
    }).then(() => {router.navigate(['/loginEmpresa']);});
    return false;
  }
};
