import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthPersonaService } from '../../services/auth-personsa.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbarbusqueda',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './navbarbusqueda.component.html',
  styleUrl: './navbarbusqueda.component.css'
})
export class NavbarbusquedaComponent {
  logueado = false;
  persona: any = null ;

  constructor(private authService: AuthPersonaService, private router:Router ) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((estado) => {
      this.logueado = estado;

      if (estado) {
        this.cargarUsuario()
      }else {
        this.persona = null;
      }
    });
  }

  cargarUsuario() {
    this.authService.getPersona().subscribe({next: (data) =>{
      this.persona = data;
      console.log(this.persona);
    },error: (err) =>{
      console.error('Error al cargar los datos del usuario', err);
    }})
  }

  logout() {
    this.authService.logout();
    this.logueado = false;
    this.persona = null;
    this.router.navigate(['/ofertasInicio']);
  }
}
