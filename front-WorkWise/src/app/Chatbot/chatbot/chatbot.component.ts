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

  tipoChatbot: 'antiguo' | 'nuevo' = 'antiguo';

  constructor(private authChatbotService: AuthChatbotService, private router: Router) { }


  enviarMensaje() {
    const texto = this.mensajeActual.trim();
    if (!texto) return;

    this.mensajes.push({ texto, emisor: 'usuario' });
    this.mensajeActual = '';
    this.scrollAbajo();

    this.escribiendo = true;

    this.authChatbotService.enviarMensaje(texto, this.tipoChatbot).subscribe({
      next: (res) => {
        this.escribiendo = false;

        let respuestaTexto: string;
        let botones: any[] = [];

        if (this.tipoChatbot === 'nuevo') {
          respuestaTexto = res;
        } else {
          const respuesta = typeof res === 'string' ? JSON.parse(res) : res;
          respuestaTexto = respuesta.texto || '...';
          botones = respuesta.botones || [];
        }

        this.mensajes.push({ texto: respuestaTexto, emisor: 'bot', botones });
        setTimeout(() => this.scrollAbajo(), 100);
      },
      error: (err) => {
        this.escribiendo = false;
        console.error('Error en chatbot:', err);
        this.mensajes.push({ texto: 'Hubo un error al conectar con el chatbot.', emisor: 'bot' });
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
