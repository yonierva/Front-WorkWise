import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthChatbotService } from '../../services/auth-chatbot.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mensaje {
  texto: String;
  emisor: 'usuario' | 'bot';
  botones?: { texto: string; accion: string }[];
}

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  @ViewChild('chatMessages') chatBody!: ElementRef;

  mensajes: Mensaje[] = [];
  mensajeActual = '';
  abierto: boolean = false;
  escribiendo: boolean = false;

  private urls: Record<string, string> = {
    abrir_login: '/login',
    abrir_registro: '/registro',
    abrir_registro_persona: '/registro/persona',
    abrir_registro_empresa: '/registro/empresa',
    abrir_ofertas: '/ofertas',
    abrir_categorias: '/ofertas/categorias',
    abrir_perfil: '/perfil',
    mostrar_menu: 'menu'
  }

  constructor(private authChatbotService: AuthChatbotService, private router: Router) { }


  enviarMensaje() {
    const texto = this.mensajeActual.trim();
    if (!texto) return;

    this.mensajes.push({ texto, emisor: 'usuario' });
    this.mensajeActual = '';
    this.scrollAbajo();

    this.authChatbotService.enviarMensaje(texto).subscribe({
      next: (res) => {
        const respuesta = typeof res === 'string' ? JSON.parse(res) : res;
        this.mensajes.push({
          texto: respuesta.texto || '...',
          emisor: 'bot',
          botones: respuesta.botones || []
        });

        // Desplaza hacia abajo una vez renderizado el mensaje
        setTimeout(() => this.scrollAbajo(), 100);
      },
      error: (err) => {
        console.error('Error en chatbot:', err);
      }
    });
  }

  accionBoton(accion: string) {
    const rutas: any = {
      abrir_login: '/loginPersona',
      abrir_registro: '/registerPersona',
      abrir_registro_persona: '/registerPersona',
      abrir_registro_empresa: '/registerEmpresa',
      abrir_ofertas: '/ofertasInicio',
      abrir_categorias: '/ofertas/categorias',
      abrir_perfil: '/perfilPersona'
    };

    if (rutas[accion]) {
      this.router.navigate([rutas[accion]]); // 👈 redirige en la misma pestaña
    } else {
      console.warn('Acción no reconocida:', accion);
    }
  }


  private scrollAbajo() {
    try {
      setTimeout(() => {
        const element = this.chatBody?.nativeElement;
        element.scrollTop = element.scrollHeight;
      }, 50);
    } catch (e) {
      console.warn('No se pudo hacer scroll:', e);
    }
  }
}
