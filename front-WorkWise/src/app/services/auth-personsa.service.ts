import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthPersonaService {

  private loggedin = new BehaviorSubject<boolean>(this.getToken() !== null);

  private apiUrl = 'http://localhost:8080/api/personas'; 

  constructor(private http: HttpClient) { }

  // 🔹 Iniciar sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // 🔹 Registrar nuevo usuario
  register(persona: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, persona);
  }

  // 🔹 Guardar token en el navegador
  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedin.next(true);
  }

  // 🔹 Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.loggedin.next(false);
  }

  // 🔹 Verificar si está logueado
  isLoggedIn(): Observable<boolean>  {
    return this.loggedin.asObservable();
  }
}
