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

  constructor(private authService: AuthPersonaService, private router:Router ) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((estado) => {
      this.logueado = estado;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/ofertasInicio']);
  }
}
