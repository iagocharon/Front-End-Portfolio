import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Experiencia } from '../models/experiencia';
import { Educacion } from '../models/educacion';
import { HardSkill } from '../models/hardSkill';
import { SoftSkill } from '../models/softSkill';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarioURL = 'http://localhost:8080/usuario/';

  constructor(private httpClient: HttpClient) {}

  public getByUsername(username: String): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.usuarioURL + `detail/${username}`);
  }

  public getExperiencias(username: String): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(
      this.usuarioURL + `experiencias/${username}`
    );
  }

  public getEducaciones(username: String): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(
      this.usuarioURL + `educaciones/${username}`
    );
  }

  public getHardSkills(username: String): Observable<HardSkill[]> {
    return this.httpClient.get<HardSkill[]>(
      this.usuarioURL + `hardskills/${username}`
    );
  }

  public getSoftSkills(username: String): Observable<SoftSkill[]> {
    return this.httpClient.get<SoftSkill[]>(
      this.usuarioURL + `softskills/${username}`
    );
  }

  public getProyectos(username: String): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(
      this.usuarioURL + `proyectos/${username}`
    );
  }

  public updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.usuarioURL + `update`, usuario);
  }
}
