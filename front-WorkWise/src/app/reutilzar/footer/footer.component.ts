import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgClass } from '@angular/common';
import { of, combineLatest } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  imports: [NgIf, NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  logueado: boolean = false;
  rol: string = 'invitado';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.rolActual().subscribe(rol => {
      this.rol = rol;
      this.logueado = rol !== 'INVITADO';
      console.log('Rol actualizado:', this.rol, '| Logueado:', this.logueado);
    });

    this.authService.actualizarRol();
  }
} 
