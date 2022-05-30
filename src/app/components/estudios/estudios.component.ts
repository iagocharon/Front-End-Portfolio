import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { Educacion } from 'src/app/models/educacion';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { EducacionService } from 'src/app/services/educacion.service';
import {
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css'],
})
export class EstudiosComponent implements OnInit {
  usuario!: Usuario;
  educaciones!: Educacion[];
  nuevaEducacion!: Educacion;
  isLogged: boolean = false;
  router: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private educacionService: EducacionService
  ) {
    this.nuevaEducacion = new Educacion();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.usuarioService
        .getByUsername(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.usuario = data;
        });
      this.usuarioService
        .getEducaciones(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.educaciones = data;
          this.educaciones = this.educaciones.sort((a, b) =>
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
          .getEducaciones(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.educaciones = data;
            this.educaciones = this.educaciones.sort((a, b) =>
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
        .getEducaciones(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.educaciones = data;
          this.educaciones = this.educaciones.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
        });
    }
  }

  OnCreate() {
    this.educacionService
      .createEducacion(this.nuevaEducacion, this.usuario.id!)
      .subscribe((data) => {
        window.location.reload();
      });
  }

  OnUpdate(id: number) {
    this.educacionService
      .updateEducacion(this.getEducacionById(id)!)
      .subscribe((data) => {});
  }

  getEducacionById(id: number): Educacion | undefined {
    for (let educacion of this.educaciones) {
      if (educacion.id == id) {
        return educacion;
      }
    }
    return undefined;
  }

  OnDelete(id: number) {
    this.educacionService.deleteEducacion(id).subscribe((data) => {
      window.location.reload();
    });
  }

  OnDrop(event: CdkDragDrop<Educacion[]>) {
    if (this.isLogged) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let ids: number[] = [];

      for (let educacion of this.educaciones) {
        ids.push(educacion.id!);
      }

      for (let i = 0; i < this.educaciones.length; i++) {
        this.educaciones[i].id = ids.sort()[i];
        this.nuevaEducacion = this.educaciones[i];
        this.OnUpdate(this.educaciones[i].id!);
      }
    }
    this.nuevaEducacion = new Educacion();
  }

  dropListEnterPredicate() {
    return this.isLogged;
  }
}
