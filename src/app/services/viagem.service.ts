import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viagem } from '../models/viagem.model';

@Injectable({ providedIn: 'root' })
export class ViagemService {
  private apiUrl = 'http://localhost:3000/api/viagens';

  constructor(private http: HttpClient) { }

  criar(viagem: Viagem): Observable<Viagem> {
    return this.http.post<Viagem>(this.apiUrl, viagem);
  }

  atualizar(id: number, viagem: Viagem): Observable<Viagem> {
    return this.http.put<Viagem>(`${this.apiUrl}/${id}`, viagem);
  }

  listar(usuarioId?: number): Observable<Viagem[]> {
  const params: any = {};
  if (usuarioId !== undefined) {
    params.usuarioId = usuarioId.toString();
  }
  return this.http.get<Viagem[]>(this.apiUrl, { params });
}

  buscarPorId(id: number): Observable<Viagem> {
    return this.http.get<Viagem>(`${this.apiUrl}/${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}