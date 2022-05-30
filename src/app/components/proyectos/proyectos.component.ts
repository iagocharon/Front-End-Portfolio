import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { Proyecto } from 'src/app/models/proyecto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ProyectoService } from 'src/app/services/proyecto.service';
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatGridList } from '@angular/material/grid-list';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  usuario!: Usuario;
  proyectos!: Proyecto[];
  nuevoProyecto!: Proyecto;
  isLogged: boolean = false;
  router: any;
  width: number = window.innerWidth;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService
  ) {
    this.nuevoProyecto = new Proyecto();
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
          .getProyectos(window.sessionStorage.getItem('AuthUserName')!)
          .subscribe((data) => {
            this.proyectos = data;
            this.proyectos = this.proyectos.sort((a, b) =>
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
          .getProyectos(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.proyectos = data;
            this.proyectos = this.proyectos.sort((a, b) =>
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
        .getProyectos(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.proyectos = data;
          this.proyectos = this.proyectos.sort((a, b) =>
            a.id! < b.id! ? -1 : 1
          );
        });
    }
  }

  OnCreate() {
    this.proyectoService
      .createProyecto(this.nuevoProyecto, this.usuario.id!)
      .subscribe((data) => {
        window.location.reload();
      });
  }

  OnUpdate(id: number) {
    this.proyectoService
      .updateProyecto(this.getProyectoById(id)!)
      .subscribe((data) => {});
  }

  getProyectoById(id: number): Proyecto | undefined {
    for (let proyecto of this.proyectos) {
      if (proyecto.id == id) {
        return proyecto;
      }
    }
    return undefined;
  }

  OnDelete(id: number) {
    this.proyectoService.deleteProyecto(id).subscribe((data) => {
      window.location.reload();
    });
  }

  OnDrag(event: CdkDragEnter) {
    if (this.isLogged) {
      moveItemInArray(this.proyectos, event.item.data, event.container.data);

      let ids: number[] = [];

      for (let proyecto of this.proyectos) {
        ids.push(proyecto.id!);
      }
      for (let i = 0; i < this.proyectos.length; i++) {
        this.proyectos[i].id = ids.sort()[i];
        this.nuevoProyecto = this.proyectos[i];
        this.OnUpdate(this.proyectos[i].id!);
      }
    }
    this.nuevoProyecto = new Proyecto();
  }

  dropListEnterPredicate() {
    return this.isLogged;
  }

  ceil(n: number): number {
    return Math.ceil(n);
  }
}
