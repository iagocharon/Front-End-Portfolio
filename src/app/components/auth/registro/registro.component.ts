import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  email!: string;
  nombre!: string;
  apellido!: string;
  titulo!: string;
  imagenPerfil!: string;
  imagenPortada!: string;
  info!: string;
  nuevoUsuario!: NuevoUsuario;
  usuario!: string;
  password!: string;
  errMsj!: string;
  isLogged = false;
  isRegistrationFail!: boolean;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(
      this.email,
      this.nombre,
      this.apellido,
      this.titulo,
      this.imagenPerfil,
      this.imagenPortada,
      this.info,
      this.usuario,
      this.password
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      (data) => {
        this.isRegistrationFail = false;
        this.router.navigate(['/login']);
      },
      (err) => {
        this.isRegistrationFail = true;
        this.errMsj = err.error.mensaje;
        console.log(err.error.message);
      }
    );
  }
}
