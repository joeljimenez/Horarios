import { CorrectorPipe } from './../../pipes/corrector.pipe';
import { Component, OnInit } from '@angular/core';
import { RestService } from './../../service/rest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ulatina',
  templateUrl: './ulatina.component.html',
  styleUrls: ['./ulatina.component.css']
})
export class UlatinaComponent implements OnInit {
  materia: string;
  sede: string;
  facultad: string;
  carrera: string;
  enfasis: string;
  ind: string;
  periodo = '0';
  anno = (new Date().getFullYear() - 3);
  anio = '0';
  facultades: any;
  carreras: any;
  horarios: any;
  materiaE = '';
  ma = 0;
  joel: any;
  decima: any;


  constructor(private rest: RestService, private router: Router) {
    this.sede = '0';
    this.facultad = '0';
    this.carrera = '0';
    this.enfasis = '0';
    this.ind = '0';
  }

  ngOnInit() {
    console.log(this.anno);
  }
  /**carga facultades de la sede */
  select_sede() {
    this.facultad = '0';
    this.carrera = '0';
    this.ind = '0'
    this.enfasis = '0';

    this.facultades = null;
    this.carreras = null;
    this.horarios = null;


    if (this.sede !== '0') {
      this.select_facultad();
    }

  }


  select_facultad() {
    const data = {
      metodo: 201,
      sede: this.sede,
    };
console.log(data);
    this.rest.Servicios(data).subscribe(
      (rs) => {
        const datos = JSON.parse(rs.text());
        if (datos[0].exito) {
          this.facultades = datos[0].data;

        }
      },
      (err) => { },
      () => { }
      // tslint:disable-next-line:semicolon
    )
  }

  /**carga carreras de la facultad */
  select_carrera() {
    this.carrera = '0';
    this.carreras = null;
    this.horarios = null;

    if (this.facultad === '0') { return; }
    const data = {
      metodo: 202,
      sede: this.sede,
      cod_facultad: this.facultad,
      cod_carrera: '210',
      cod_enfasis: '002',
      cod_plan: '218',
      año: 2016,
      periodo: 1
    }

    this.rest.Servicios(data).subscribe(
      (rs) => {
        const datos = JSON.parse(rs.text());
        if (datos[0].exito) {
          this.carreras = datos[0].data;
          // tslint:disable-next-line:forin
          for (const key in this.carreras) {
            this.carreras[key].ind = key + 1;
          }
        }
      },
      (err) => { },
      () => { }
      // tslint:disable-next-line:semicolon
    )
  }

  open_plan() {


    if (this.ind === '0') { alert('Seleccione facultad y carrera'); return; }
    for (const key in this.carreras) {
      if (this.carreras[key].ind === this.ind) {
        this.enfasis = this.carreras[key].sub_id;
        this.carrera = this.carreras[key].id;
        break;
      }
    }


    if (this.anio == '0') { alert('Seleccione el año'); return false; }
    if (this.periodo == '0') { alert('Seleccione el perido'); return false; }

    const data = {
      metodo: 200,
      sede: this.sede,
      cod_facultad: this.facultad,
      cod_carrera: this.carrera,
      cod_enfasis: this.enfasis,
      año: this.anio,
      periodo: this.periodo
    };


    const paramatros = btoa(JSON.stringify(data));

    this.router.navigate(['./visor', paramatros]);

  }
  Seguir() {
    this.router.navigate(['./Matricula']);
  }

}
