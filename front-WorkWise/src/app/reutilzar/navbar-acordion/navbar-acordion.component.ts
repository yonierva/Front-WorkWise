import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgClass } from '@angular/common';
@Component({
  selector: 'app-navbar-acordion',
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './navbar-acordion.component.html',
  styleUrl: './navbar-acordion.component.css'
})
export class NavbarAcordionComponent implements OnInit {
  logueado: boolean = false;
  rol: string = 'invitado';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.rolActual().subscribe(rol => {
      this.rol = rol;
      this.logueado = rol !== 'INVITADO';
      console.log('Rol actualizado:', this.rol, '| Logueado:', this.logueado);
    });

    this.authService.actualizarRol();
  }
}
