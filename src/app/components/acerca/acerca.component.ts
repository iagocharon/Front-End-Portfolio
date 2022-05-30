import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css'],
})
export class AcercaComponent implements OnInit {
  usuario!: Usuario;
  isLogged: boolean = false;


  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.usuarioService
        .getByUsername(window.sessionStorage.getItem('AuthUserName')!)
        .subscribe((data) => {
          this.usuario = data;
        });
      if (
        window.sessionStorage.getItem('AuthUserName') ==
          this.activatedRoute.snapshot.paramMap.get('usuario') ||
        this.activatedRoute.snapshot.paramMap.get('usuario') == null
      ) {
        this.isLogged = true;
      } else {
        this.usuarioService
          .getByUsername(this.activatedRoute.snapshot.paramMap.get('usuario')!)
          .subscribe((data) => {
            this.usuario = data;
          });
      }
    } else {
      this.usuarioService
        .getByUsername(this.activatedRoute.snapshot.paramMap.get('usuario')!)
        .subscribe((data) => {
          this.usuario = data;
        });
    }
  }

  OnUpdate() {
    this.usuarioService.updateUsuario(this.usuario).subscribe((data) => {
    });
  }
}
