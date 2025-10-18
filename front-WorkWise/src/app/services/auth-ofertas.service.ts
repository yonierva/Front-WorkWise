import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthOfertasService {

  private apiUrl = 'http://localhost:8080/api/ofertas';

  constructor(private http: HttpClient) { }

  // 🔹 Obtener datos del usurio
  getOfertas(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No hay token disponible');
    }

    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
