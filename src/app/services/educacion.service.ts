import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  educacionURL = 'http://localhost:8080/educacion/';

  constructor(private httpClient: HttpClient) {}

  public getById(id: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(
      this.educacionURL + `detail/${id}`
    );
  }

  public createEducacion(
    educacion: Educacion,
    usuarioId: number
  ): Observable<Educacion> {
    return this.httpClient.post<Educacion>(
      this.educacionURL + `create/usuario/` + usuarioId,
      educacion
    );
  }

  public updateEducacion(educacion: Educacion): Observable<Educacion> {
    return this.httpClient.put<Educacion>(
      this.educacionURL + `update/` + educacion.id,
      educacion
    );
  }

  public deleteEducacion(id: number): Observable<any> {
    return this.httpClient.delete(this.educacionURL + 'delete/' + id);
  }
}
