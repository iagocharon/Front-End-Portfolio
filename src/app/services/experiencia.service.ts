import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  experienciaURL = 'https://back-end-portfolio.herokuapp.com/experiencia/';

  constructor(private httpClient: HttpClient) {}

  public getById(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(
      this.experienciaURL + `detail/${id}`
    );
  }

  public createExperiencia(
    experiencia: Experiencia,
    usuarioId: number
  ): Observable<Experiencia> {
    return this.httpClient.post<Experiencia>(
      this.experienciaURL + `create/usuario/` + usuarioId,
      experiencia
    );
  }

  public updateExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.httpClient.put<Experiencia>(
      this.experienciaURL + `update/` + experiencia.id,
      experiencia
    );
  }

  public deleteExperiencia(id: number): Observable<any> {
    return this.httpClient.delete(this.experienciaURL + 'delete/' + id);
  }
}
