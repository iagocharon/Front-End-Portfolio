import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoftSkill } from '../models/softSkill';

@Injectable({
  providedIn: 'root',
})
export class SoftSkillService {
  softSkillURL = 'http://localhost:8080/softSkill/';

  constructor(private httpClient: HttpClient) {}

  public getById(id: number): Observable<SoftSkill> {
    return this.httpClient.get<SoftSkill>(this.softSkillURL + `detail/${id}`);
  }

  public createSoftSkill(
    softSkill: SoftSkill,
    usuarioId: number
  ): Observable<SoftSkill> {
    return this.httpClient.post<SoftSkill>(
      this.softSkillURL + `create/usuario/` + usuarioId,
      softSkill
    );
  }

  public updateSoftSkill(softSkill: SoftSkill): Observable<SoftSkill> {
    return this.httpClient.put<SoftSkill>(
      this.softSkillURL + `update/` + softSkill.id,
      softSkill
    );
  }

  public deleteSoftSkill(id: number): Observable<any> {
    return this.httpClient.delete(this.softSkillURL + 'delete/' + id);
  }
}
