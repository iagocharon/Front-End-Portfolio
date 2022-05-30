export class Experiencia {
  id?: number;
  cargo: string;
  institucion: string;
  logoInstitucion: string;
  anioInicio: number;
  anioFin: number;
  lugar: string;

  constructor(
    cargo?: string,
    institucion?: string,
    logoInstitucion?: string,
    anioInicio?: number,
    anioFin?: number,
    lugar?: string
  ) {
    this.cargo = cargo ?? "";
    this.institucion = institucion ?? '';
    this.logoInstitucion = logoInstitucion ?? '';
    this.anioInicio = anioInicio ?? 0;
    this.anioFin = anioFin ?? 0;
    this.lugar = lugar ?? '';
  }


}
