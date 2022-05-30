import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { SoftSkill } from 'src/app/models/softSkill';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { SoftSkillService } from 'src/app/services/soft-skill.service';
import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';

declare var skillsFunction: any;

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css'],
})
export class SoftSkillsComponent implements OnInit {
  usuario!: Usuario;
  softSkills!: SoftSkill[];
  nuevaSoftSkill!: SoftSkill;
  isLogged: boolean = false;
  router: any;
  width: number = window.innerWidth;
  indiceFilas!: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private softSkillService: SoftSkillService
  ) {
    this.nuevaSoftSkill = new SoftSkill();
    new skillsFunction();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.usuarioService
        .getByUsername(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.usuario = data;
        });
      this.usuarioService
        .getSoftSkills(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.softSkills = data;
          this.softSkills = this.softSkills.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
          let aux: number[] = [];
          for (let i = 0; i < this.softSkills.length; i++) {
            if (i % 2 == 0) {
              aux.push(i);
            }
          }
          this.indiceFilas = aux;
        });
      if (
        window.sessionStorage.getItem('AuthUserName') ==
          this.activatedRoute.snapshot.paramMap.get('usuario') ||
        this.activatedRoute.snapshot.paramMap.get('usuario') == null
      ) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        this.usuarioService
          .getByUsername(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.usuario = data;
          });
        this.usuarioService
          .getSoftSkills(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.softSkills = data;
            this.softSkills = this.softSkills.sort((a, b) =>
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
        .getSoftSkills(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.softSkills = data;
          this.softSkills = this.softSkills.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
        });
    }
  }

  OnCreate() {
    this.softSkillService
      .createSoftSkill(this.nuevaSoftSkill, this.usuario.id!)
      .subscribe((data) => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      });
  }

  OnUpdate(id: number) {
    this.softSkillService
      .updateSoftSkill(this.getSoftSkillById(id)!)
      .subscribe((data) => {});
  }

  getSoftSkillById(id: number): SoftSkill | undefined {
    for (let softSkill of this.softSkills) {
      if (softSkill.id == id) {
        return softSkill;
      }
    }
    return undefined;
  }

  OnDelete(id: number) {
    this.softSkillService.deleteSoftSkill(id).subscribe((data) => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }

  OnDrag(event: CdkDragEnter) {
    if (this.isLogged) {
      moveItemInArray(this.softSkills, event.item.data, event.container.data);

      let ids: number[] = [];

      for (let softSkill of this.softSkills) {
        ids.push(softSkill.id!);
      }
      for (let i = 0; i < this.softSkills.length; i++) {
        this.softSkills[i].id = ids.sort()[i];
        this.nuevaSoftSkill = this.softSkills[i];
        this.OnUpdate(this.softSkills[i].id!);
      }
    }
    this.nuevaSoftSkill = new SoftSkill();
  }

  dropListEnterPredicate() {
    return this.isLogged;
  }

  ceil(n: number): number {
    return Math.ceil(n);
  }
}
