import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HardSkill } from 'src/app/models/hardSkill';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { HardSkillService } from 'src/app/services/hard-skill.service';
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatGridList } from '@angular/material/grid-list';

declare var skillsFunction: any;

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css'],
})
export class HardSkillsComponent implements OnInit {
  usuario!: Usuario;
  hardSkills!: HardSkill[];
  nuevaHardSkill!: HardSkill;
  isLogged: boolean = false;
  router: any;
  width: number = window.innerWidth;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private hardSkillService: HardSkillService
  ) {
    this.nuevaHardSkill = new HardSkill();
    new skillsFunction();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      if (
        window.sessionStorage.getItem('AuthUserName') ==
          this.activatedRoute.snapshot.paramMap.get('usuario') ||
        this.activatedRoute.snapshot.paramMap.get('usuario') == null
      ) {
        this.usuarioService
          .getByUsername(window.sessionStorage.getItem('AuthUserName')!)
          .subscribe((data) => {
            this.usuario = data;
          });
        this.usuarioService
          .getHardSkills(window.sessionStorage.getItem('AuthUserName')!)
          .subscribe((data) => {
            this.hardSkills = data;
            this.hardSkills = this.hardSkills.sort((a, b) =>
              a.id! < b.id! ? -1 : 1
            );
          });
        this.isLogged = true;
      } else {
        this.isLogged = false;
        this.usuarioService
          .getByUsername(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.usuario = data;
          });
        this.usuarioService
          .getHardSkills(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.hardSkills = data;
            this.hardSkills = this.hardSkills.sort((a, b) =>
              a.id! < b.id! ? -1 : 1
            );
          });
      }
    } else {
      this.isLogged = false;
      this.usuarioService
        .getByUsername(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.usuario = data;
        });
      this.usuarioService
        .getHardSkills(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.hardSkills = data;
          this.hardSkills = this.hardSkills.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
        });
    }
  }

  OnCreate() {
    this.hardSkillService
      .createHardSkill(this.nuevaHardSkill, this.usuario.id!)
      .subscribe((data) => {
        window.location.reload();
      });
  }

  OnUpdate(id: number) {
    this.hardSkillService
      .updateHardSkill(this.getHardSkillById(id)!)
      .subscribe((data) => {});
  }

  getHardSkillById(id: number): HardSkill | undefined {
    for (let hardSkill of this.hardSkills) {
      if (hardSkill.id == id) {
        return hardSkill;
      }
    }
    return undefined;
  }

  OnDelete(id: number) {
    this.hardSkillService.deleteHardSkill(id).subscribe((data) => {
      window.location.reload();
    });
  }

  OnDrag(event: CdkDragEnter) {
    if (this.isLogged) {
      moveItemInArray(this.hardSkills, event.item.data, event.container.data);

      let ids: number[] = [];

      for (let hardSkill of this.hardSkills) {
        ids.push(hardSkill.id!);
      }
      for (let i = 0; i < this.hardSkills.length; i++) {
        this.hardSkills[i].id = ids.sort()[i];
        this.nuevaHardSkill = this.hardSkills[i];
        this.OnUpdate(this.hardSkills[i].id!);
      }
    }
    this.nuevaHardSkill = new HardSkill();
  }

  dropListEnterPredicate() {
    return this.isLogged;
  }

  ceil(n: number): number {
    return Math.ceil(n);
  }
}
