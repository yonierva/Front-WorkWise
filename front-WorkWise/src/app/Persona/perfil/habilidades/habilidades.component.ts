import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AuthPersonaService } from '../../../services/auth-personsa.service';
import { FormsModule } from "@angular/forms";
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-habilidades',
  animations: [
    trigger('slideToggle', [
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden',
        padding: '0'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        padding: '*'
      })),
      transition('closed <=> open', [
        animate('300ms ease')
      ])
    ])
  ],
  imports: [CommonModule, FormsModule],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent {

  habilidad = '';
  isModalOpen = false;
  habilidades: any[] = []
  isOpenHabilidades: boolean = false

  constructor(private authPersonaService: AuthPersonaService) { }

  toggleHabilidades() {
    this.isOpenHabilidades = !this.isOpenHabilidades;
  }

  ngOnInit() {
    this.cargarHabilidades();
  }

  cargarHabilidades() {
    this.authPersonaService.getHabilidades().subscribe({
      next: (res) => {
        if (res) this.habilidades = res;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las habilidades', 'error');
      }
    });
  }

  agregarHabilidad() {
    if (!this.habilidad) {
      Swal.fire({
        icon: 'warning',
        title: 'El nombre de la habilidad es obligatorio',
        timer: 1500
      });
      return;
    }

    this.authPersonaService.aggHabilidades(this.habilidad).subscribe({
      next: (res) => {
        const mensajeExito = res.mensaje || 'Tu habilidad ha sido agregada exitosamente'
        Swal.fire({
          icon: 'success',
          title: mensajeExito,
          timer: 1500,
          timerProgressBar: true
        }).then(() => {
          this.habilidad = '';
          this.cargarHabilidades();
        })
      },
      error: (err) => {
        const mensajeError = err.error?.mensaje || err.error || 'Error al agregar la habilidad';
        Swal.fire({
          icon: 'info',
          title: mensajeError,
          timer: 2000
        })
      }
    });
  }

  borrarHabilidad(id: number) {
    Swal.fire({
      icon: 'warning',
      title: '¿Eliminar habilidad?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.authPersonaService.deleteHabilidades(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: res,
              timer: 1500
            });
            this.cargarHabilidades(); 
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: err.error,
              timer: 1500
            });
          }
        });
      }
    });
  }




  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
