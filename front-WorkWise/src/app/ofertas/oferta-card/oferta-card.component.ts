import { Component } from '@angular/core';
import { AuthOfertasService } from '../../services/auth-ofertas.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-oferta-card',
  imports: [NgForOf, NgIf],
  templateUrl: './oferta-card.component.html',
  styleUrl: './oferta-card.component.css'
})
export class OfertaCardComponent {
  ofertas: any[] = [];

  constructor(private authOfertasService: AuthOfertasService) { }

  ngOnInit() {
    this.authOfertasService.getOfertas().subscribe({next: (data) =>{
      this.ofertas = data;
      console.log(this.ofertas);
    },error: (err) =>{
      console.error('Error al cargar las ofertas', err);
    }})
  }
}
