import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthPersonaService } from '../../services/auth-personsa.service';
import { AuthEmpresaService } from '../../services/auth-empresa.service';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbarbusqueda',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbarbusqueda.component.html',
  styleUrl: './navbarbusqueda.component.css'
})
export class NavbarbusquedaComponent {
  @Input() modo: 'link' | 'buscador' = 'link';
  logueado = false;
  persona: any = null;
  empresa: any = null;

  constructor(private authPersonaService: AuthPersonaService, private authEmpresaService: AuthEmpresaService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((estado) => {
      this.logueado = estado;
      if (estado) {
        this.authService.rolActual().subscribe(rol => {
          if (rol === 'PERSONA') {
            this.cargarUsuario();
          } else if (rol === 'EMPRESA') {
            this.cargarEmpresa();
          }
        });
      } else {
        this.persona = null;
        this.empresa = null;
      }
    });
  }

  cargarUsuario() {
    this.authPersonaService.getPersona().subscribe({
      next: (data) => {
        this.persona = data;
        console.log(this.persona);
        this.authPersonaService.getFotoPerfil(this.persona.id).subscribe(blob => {
          this.persona.photo = URL.createObjectURL(blob);
        })
      }, error: (err) => {
        console.error('Error al cargar los datos del usuario', err);
      }
    });
  }

  cargarEmpresa() {
    this.authEmpresaService.getEmpresa().subscribe({
      next: (data) => {
        this.empresa = data;
        console.log(this.empresa);
      }, error: (err) => {
        console.error('Error al cargar los datos de la empresa', err);
      }
    });
  }

  get iniciales(): string {
    if (!this.persona?.nombre || !this.persona?.apellido) return '';
    return (
      this.persona.nombre.charAt(0).toUpperCase() +
      this.persona.apellido.charAt(0).toUpperCase()
    );
  }

  logout() {
    this.authService.logout();
    this.logueado = false;
    this.persona = null;
    this.router.navigate(['/ofertasInicio']);
  }
}
