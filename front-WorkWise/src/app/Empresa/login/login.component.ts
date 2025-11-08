import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from "@angular/router";
import { AuthEmpresaService } from '../../services/auth-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class empresaLoginComponent {

  usuario = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthEmpresaService, private router: Router) { }

  login() {
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveRol(response.rol)
        Swal.fire({
          icon: 'success',
          title: '¡Login exitoso!',
          timer: 1500
        }).then(() => {
          this.router.navigate(['/ofertas-empresa']);
        });
      },
      error: (error) => {
        console.error('Error de login:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error de login',
          text: 'Credenciales incorrectas. Por favor, intenta de nuevo.'
        });
      }
    });
  }
  
  togglePasswordVisibility(fieldId: string) {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    const icon = input?.nextElementSibling as HTMLElement;

    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        icon?.classList.remove('fa-eye');
        icon?.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon?.classList.remove('fa-eye-slash');
        icon?.classList.add('fa-eye');
      }
    }
  }
}
