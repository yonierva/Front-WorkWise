import { Component, AfterViewInit, ElementRef, viewChild, ViewChild} from '@angular/core';
import { AuthPersonaService } from '../../services/auth-personsa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import flatpickr  from "flatpickr";
import { Spanish } from 'flatpickr/dist/l10n/es.js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls : ['./register.component.css']
})
export class RegisterComponent  {
  @ViewChild('fechaInput') fechaInput!: ElementRef;

  step: number = 1;
  private flatpickrInstance: any;

  persona = {
    nombre: '',
    apellido: '',
    numero_documento: '',
    tipo_Documento: '',
    fecha_Nacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    tipo_telefono: '',
    profesion: '',
    usuario:{
      email: '',
      password: ''
    }
  };

  confirmPassword:string = '';

  nextStep() {
    if(this.step < 2) {
      this.step++;
      console.log(this.persona);
      setTimeout(() => {
        const fechaInput = document.getElementById('fecha');

        if (fechaInput) {
          flatpickr(fechaInput, {
            dateFormat: 'Y-m-d',
            altFormat: 'd/m/Y',
            locale: Spanish,
            maxDate: 'today'
          });
        }
        console.log(fechaInput);
      }, 100);
    }
  }

  prevStep() {
    if(this.step > 1) {
      this.step--;
    }
  }

  constructor(private authService: AuthPersonaService) { }

  register() {
    const nacimiento = new Date(this.persona.fecha_Nacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (edad < 18) {
      alert('Debes ser mayor de 18 años para registrarte.');
      return;
    }else{
        this.authService.register(this.persona).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert('Registro exitoso');
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          alert('Error en el registro');
        }
      });
    }
  }

    passwordStrength = {
    width: '0%',
    color: 'red',
    text: ''
  };

  checkPasswordStrength(password: string) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    switch (strength) {
      case 0:
        this.passwordStrength = { width: '0%', color: 'red', text: '' };
        break;
      case 1:
        this.passwordStrength = { width: '25%', color: 'red', text: 'Débil' };
        break;
      case 2:
        this.passwordStrength = { width: '50%', color: 'orange', text: 'Media' };
        break;
      case 3:
        this.passwordStrength = { width: '75%', color: 'yellowgreen', text: 'Buena' };
        break;
      case 4:
        this.passwordStrength = { width: '100%', color: 'green', text: 'Fuerte' };
        break;
    }
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
