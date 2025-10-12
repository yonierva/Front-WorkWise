import { Component } from '@angular/core';
import { NavbarAcordionComponent } from "../../reutilzar/navbar-acordion/navbar-acordion.component";
import { NavbarbusquedaComponent } from "../../reutilzar/navbarbusqueda/navbarbusqueda.component";

@Component({
  selector: 'app-ofertas',
  imports: [NavbarAcordionComponent, NavbarbusquedaComponent],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

}
