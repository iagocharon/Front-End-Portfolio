import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  styles: [':host { z-index: 999; }'],
})
export class MenuComponent implements OnInit {
  usuario!: Usuario;
  isLogged = false;
  route: string = this.activatedRoute.snapshot.paramMap.get('usuario')!;
  url = this.router.url;
  width: number = window.innerWidth;

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
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
            console.log('Muestro whatsapp');
            console.log(this.usuario.whatsapp);
          });
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

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  OnUpdate() {
    this.usuarioService.updateUsuario(this.usuario).subscribe((data) => {});
  }
}
