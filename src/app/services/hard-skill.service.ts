import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardSkill } from '../models/hardSkill';

@Injectable({
  providedIn: 'root',
})
export class HardSkillService {
  hardSkillURL = 'http://localhost:8080/hardSkill/';

  constructor(private httpClient: HttpClient) {}

  public getById(id: number): Observable<HardSkill> {
    return this.httpClient.get<HardSkill>(
      this.hardSkillURL + `detail/${id}`
    );
  }

  public createHardSkill(
    hardSkill: HardSkill,
    usuarioId: number
  ): Observable<HardSkill> {
    return this.httpClient.post<HardSkill>(
      this.hardSkillURL + `create/usuario/` + usuarioId,
      hardSkill
    );
  }

  public updateHardSkill(hardSkill: HardSkill): Observable<HardSkill> {
    return this.httpClient.put<HardSkill>(
      this.hardSkillURL + `update/` + hardSkill.id,
      hardSkill
    );
  }

  public deleteHardSkill(id: number): Observable<any> {
    return this.httpClient.delete(this.hardSkillURL + 'delete/' + id);
  }
}
