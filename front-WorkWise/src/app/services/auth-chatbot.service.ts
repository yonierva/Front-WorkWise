import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthChatbotService {

  private apiUrl = 'http://localhost:8080/api/chatbot/message';

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { mensaje });
  }
}
