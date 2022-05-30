import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  proyectoURL = 'https://back-end-portfolio.herokuapp.com/proyecto/';

  constructor(private httpClient: HttpClient) {}

  public getById(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.proyectoURL + `detail/${id}`);
  }

  public createProyecto(
    proyecto: Proyecto,
    usuarioId: number
  ): Observable<Proyecto> {
    return this.httpClient.post<Proyecto>(
      this.proyectoURL + `create/usuario/` + usuarioId,
      proyecto
    );
  }

  public updateProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.httpClient.put<Proyecto>(
      this.proyectoURL + `update/` + proyecto.id,
      proyecto
    );
  }

  public deleteProyecto(id: number): Observable<any> {
    return this.httpClient.delete(this.proyectoURL + 'delete/' + id);
  }
}
