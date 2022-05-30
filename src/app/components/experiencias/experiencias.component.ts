import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { Experiencia } from 'src/app/models/experiencia';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-experiencias',
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css'],
})
export class ExperienciasComponent implements OnInit {
  usuario!: Usuario;
  experiencias!: Experiencia[];
  nuevaExperiencia!: Experiencia;
  isLogged: boolean = false;
  router: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private experienciaService: ExperienciaService
  ) {
    this.nuevaExperiencia = new Experiencia();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.usuarioService
        .getByUsername(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.usuario = data;
        });
      this.usuarioService
        .getExperiencias(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.experiencias = data;
          this.experiencias = this.experiencias.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
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
          .getExperiencias(
            this.activatedRoute.snapshot.paramMap.get('usuario')!
          )
          .subscribe((data) => {
            this.experiencias = data;
            this.experiencias = this.experiencias.sort((a, b) =>
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
        .getExperiencias(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.experiencias = data;
          this.experiencias = this.experiencias.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
        });
    }
  }

  OnCreate() {
    this.experienciaService
      .createExperiencia(this.nuevaExperiencia, this.usuario.id!)
      .subscribe((data) => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      });
  }

  OnUpdate(id: number) {
    this.experienciaService
      .updateExperiencia(this.getExperienciaById(id)!)
      .subscribe((data) => {});
  }

  getExperienciaById(id: number): Experiencia | undefined {
    for (let experiencia of this.experiencias) {
      if (experiencia.id == id) {
        return experiencia;
      }
    }
    return undefined;
  }

  OnDelete(id: number) {
    this.experienciaService.deleteExperiencia(id).subscribe((data) => {
      window.location.reload();
    });
  }

  OnDrop(event: CdkDragDrop<Experiencia[]>) {
    if (this.isLogged) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let ids: number[] = [];

      for (let experiencia of this.experiencias) {
        ids.push(experiencia.id!);
      }

      for (let i = 0; i < this.experiencias.length; i++) {
        this.experiencias[i].id = ids.sort()[i];
        this.nuevaExperiencia = this.experiencias[i];
        this.OnUpdate(this.experiencias[i].id!);
      }
    }
    this.nuevaExperiencia = new Experiencia();
  }

  dropListEnterPredicate() {
    return this.isLogged;
  }
}
