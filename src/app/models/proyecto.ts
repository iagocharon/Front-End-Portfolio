export class Proyecto {
  id?: number;
  nombre: string;
  mes: number;
  anio: number;
  link: string;
  urlImagen: string;
  descripcion: string;

  constructor(
    nombre?: string,
    mes?: number,
    anio?: number,
    link?: string,
    urlImagen?: string,
    descripcion?: string
  ) {
    this.nombre = nombre ?? '';
    this.mes = mes ?? 0;
    this.anio = anio ?? 0;
    this.link = link ?? '';
    this.urlImagen = urlImagen ?? '';
    this.descripcion = descripcion ?? '';
  }
}
