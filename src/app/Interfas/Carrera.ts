export class Carrera {
  facultad: string;
  carrera: string;
  enfasis: string;
  plan: string;
  area: string;
  nombreCarrera: string;
  constructor(facultad: string , carrera: string, enfasis: string ,
    plan: string, area: string , nombreCarrera: string) {
    this.facultad = facultad;
    this.carrera = carrera;
    this.enfasis = enfasis;
    this.plan = plan;
    this.area = area;
    this.nombreCarrera = nombreCarrera;
  }
}
