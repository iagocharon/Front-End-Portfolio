export class SoftSkill {
  id?: number;
  nombre: string;

  constructor(nombre?: string) {
    this.nombre = nombre ?? "";
  }
}
