export class Educacion {
  id?: number;
  tipo: string;
  institucion: string;
  logoInstitucion: string;
  anioInicio: number;
  anioFin: number;
  lugar: string;

  constructor(
    tipo?: string,
    institucion?: string,
    logoInstitucion?: string,
    anioInicio?: number,
    anioFin?: number,
    lugar?: string
  ) {
    this.tipo = tipo ?? "";
    this.institucion = institucion ?? '';
    this.logoInstitucion = logoInstitucion ?? '';
    this.anioInicio = anioInicio ?? 0;
    this.anioFin = anioFin ?? 0;
    this.lugar = lugar ?? '';
  }
}
