import { Carrera } from './Carrera';
export interface Registro {
  consulta: number;
  consecutivo: number;
  sede: string;
  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  sexo: string;
  provincia: string;
  direccion: string;
  telefono1: string;
  telefono2: string;
  email: string;
  anio: '';
  periodo: string;
  perido_Maestria: string;
  fecha_nacimiento: string;
  facultad: string;

carrera: Carrera[];
}
