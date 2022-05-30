export class NuevoUsuario {
  email: string;
  nombre: string;
  apellido: string;
  titulo: string;
  imagenPerfil: string;
  imagenPortada: string;
  info: string;
  nombreUsuario: string;
  password: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  twitter: string;
  github: string;
  constructor(
    email: string,
    nombre: string,
    apellido: string,
    titulo: string,
    imagenPerfil: string,
    imagenPortada: string,
    info: string,
    nombreUsuario: string,
    password: string
  ) {
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.titulo = titulo;
    this.imagenPerfil = imagenPerfil;
    this.imagenPortada = imagenPortada;
    this.info = info;
    this.nombreUsuario = nombreUsuario;
    this.password = password;
    this.whatsapp = '';
    this.instagram = '';
    this.facebook = '';
    this.twitter = '';
    this.github = '';
  }
}
