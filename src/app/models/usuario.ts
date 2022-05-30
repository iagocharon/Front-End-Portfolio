export class Usuario {
  id?: number;
  usuario: string;
  email: string;
  nombre: string;
  apellido: string;
  titulo: string;
  imagenPerfil: string;
  imagenPortada: string;
  info: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  twitter: string;
  github: string;
  constructor(
    usuario: string,
    email: string,
    nombre: string,
    apellido: string,
    titulo: string,
    imagenPerfil: string,
    imagenPortada: string,
    info: string
  ) {
    this.usuario = usuario;
    this.email = email;
    this.nombre = nombre;
    this.apellido = apellido;
    this.titulo = titulo;
    this.imagenPerfil = imagenPerfil;
    this.imagenPortada = imagenPortada;
    this.info = info;
    this.whatsapp = '';
    this.instagram = '';
    this.facebook = '';
    this.twitter = '';
    this.github = '';
  }
}
