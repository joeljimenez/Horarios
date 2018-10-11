import { Registro } from './../../../Interfas/Registro';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { RestService } from '../../../service/rest.service';
import { Carrera } from '../../../Interfas/Carrera';
import { Router } from '@angular/router';
import { VALID } from '@angular/forms/src/model';
@Component({
  selector: 'app-formulario',
  templateUrl: './Formulario.component.html',
  styleUrls: ['./Formulario.component.css']

})
export class FormularioComponent implements OnInit {
Periodo = [];
area_negocio: any;
habil = true;
cargar = [];
provincia = [
{
'id': '1',
'nombre': 'Bocas del Toro'
},
{
'id': '2',
'nombre': 'Cocle'
},
{
'id': '3',
'nombre': 'Colón'
},
{
'id': '4',
'nombre': 'Chiriquí'
},
{
'id': '5',
'nombre': 'Darién'
},
{
'id': '6',
'nombre': 'Herrara'
},
{
'id': '7',
'nombre': 'Los Santos'
},
{
'id': '8',
'nombre': 'Panamá'
},
{
'id': '9',
'nombre': 'Veraguas'
},
{
'id': '10',
'nombre': 'Sán Blas'
},
];
Meses = [
  {

  'id': '1',
  'nombre': 'Enero'
  },
  {
  'id': '2',
  'nombre': 'Febrero'
  },
  {
  'id': '3',
  'nombre': 'Marzo'
  },
  {
  'id': '4',
  'nombre': 'Abril'
  },
  {
  'id': '5',
  'nombre': 'Mayo'
  },
  {
  'id': '6',
  'nombre': 'Junio'
  },
  {
  'id': '7',
  'nombre': 'Julio'
  },
  {
  'id': '8',
  'nombre': 'Agosto'
  },
  {
  'id': '9',
  'nombre': '	Septiembre'
  },
  {
  'id': '10',
  'nombre': 'Octubre'
  },
  {
    'id': '11',
    'nombre': 'Noviembre'
    },
    {
      'id': '12',
      'nombre': 'Diciembre'
      },
  ];

public Formulario: Registro = {
consulta: 1,
consecutivo: 0,
sede: '',
cedula: '',
nombre: '',
apellido1: '',
apellido2: '',
email: '',
direccion : '',
fecha_nacimiento : '',
telefono1: '',
telefono2: '',
provincia: '',
sexo: '',
periodo: '',
anio: '',
facultad: '',
carrera: [],
perido_Maestria:'',
};
nombre1: string;
sede: string;
facultades: any;
facultad: string;
carreras: any;
Card: any;
ind: '';
forma: FormGroup;
anio: any;
mes: any;
id: string;
habilitar: boolean;
constructor(public rest: RestService, public router: Router) {
this.ind = '';
this.id = '';

// console.log(new Date().getUTCDate());
this.anio = ( new Date().getFullYear());
// this.anno(this.anio, '');
this.forma =   new FormGroup( {
  'nombre':    new FormControl ('' , [Validators.required]),
  'apellido':  new FormControl ('' , [Validators.required]),
  'apellido2': new FormControl ('' , [Validators.required]),
  'cedula':    new FormControl ('' , [Validators.required]),
  'email':     new FormControl ('' , [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  'dirrecion':  new FormControl ('' , [Validators.required]),
  'periodo':  new FormControl ('' , [Validators.required]),
  'celular':   new FormControl ('' , [Validators.required]),
  'telefono': new FormControl('' , [] ),
  'provincia': new FormControl ('' , [Validators.required]),
  'sexo':      new FormControl ('' , [Validators.required]),
  'anno':      new FormControl ('' , [Validators.required, Validators.maxLength(4)]),
  'facultad':  new FormControl ('', [ Validators.required]),
  'sede':      new FormControl ('', [Validators.required] ),
  'carrera' :  new FormControl('', Validators.required),
  'id' :  new FormControl('', [])
});

  }

  ngOnInit(): void { }

GuardarDatos() {
this.Formulario.periodo = this.Formulario.perido_Maestria;
  console.log(this.Formulario);
 if (this.forma.valid) {
   this.habilitar = true;
 }
this.rest.ServiciosMatricula(this.Formulario).subscribe(
  (rs) => {
    const datos = JSON.parse(rs.text());

    if (datos.exito) {

      alert('Solocitud Enviada Correctamente');
      this.Formulario.carrera.splice(0 , 3);
      this.forma.reset('');
      if (!this.forma.valid) {
        this.habilitar = false;
      }
      this.id = '';
      this.facultades = [];
      this.Formulario.facultad = '';
      this.carreras = [];
      this.ind = '';
      this.Formulario.periodo = '';
      this.Formulario.anio  = '';
      this.Formulario.sexo = '';
      this.Formulario.provincia = '';
    }
  },
  (err) => {
       alert('Erro al mandar Solicitud');
  this.Formulario.carrera.splice(0 , 3);
  this.forma.reset('');
  if (!this.forma.valid) {
    this.habilitar = false;
  }
 },
  () => { }
  // tslint:disable-next-line:semicolon
)

}

  select_sede() {
 if (this.Formulario.sede !== '') {

      this.select_facultad();
      this.id = '';
      this.facultades = [];
      this.Formulario.facultad = '';
      this.carreras = [];
      this.ind = '';
    } else {
      this.id = '';
      this.facultades = [];
      this.Formulario.facultad = '';
      this.carreras = [];
      this.ind = '';
    }

  }


  select_facultad() {
    const data = {
      consulta: 1,
      sede: this.Formulario.sede,
    };


    this.rest.Nuevo(data).subscribe(
      (rs) => {

        const datos = JSON.parse(rs.text());

        if (datos.exito) {


          this.facultades = datos.data;

        }
      },
      (err) => { console.error(err); },
      () => { }
      // tslint:disable-next-line:semicolon
    )
  }

  select_carrera() {


    if (this.Formulario.facultad === '') {
      this.id = '';
      this.ind = '';
      this.carreras = [];
      return;
    } else {
      this.id = '';
    }
    const data = {
      consulta: 2,
      sede: this.Formulario.sede,
      facultad: this.Formulario.facultad,
    };

   this.rest.Nuevo(data).subscribe(
      (rs) => {
        const datos = JSON.parse(rs.text());
        if (datos.exito) {

          this.carreras = datos.data;

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

  select_carr() {
    if (this.Formulario.facultad === '') { return; }
    const data = {
      consulta: 2,
      sede: this.Formulario.sede,
      facultad: this.Formulario.facultad,

    };
    this.habil = false;
  this.rest.Nuevo(data).subscribe(
      (rs) => {
        const datos = JSON.parse(rs.text());
        if (datos.exito) {

          this.Card = datos.data;


         const nuevo = new Carrera (this.Formulario.facultad, this.carreras[this.ind].Id ,
          this.carreras[this.ind].sub_id, this.carreras[this.ind].C01COD , this.carreras[this.ind].C01COD ,
           this.carreras[this.ind].nombre);
           this.area_negocio = this.carreras[this.ind].C01COD;
         if (this.ind !== '') {
          this.Formulario.carrera.push(nuevo);
        }
      }
      },
      (err) => { },
      () => { }
      // tslint:disable-next-line:semicolon
    )
 }

  Rest(i: number) {
    this.Formulario.carrera.splice(i , 1);
  }
  // logica que determina l mes y año exacto
  anno() {
  let mes = (new Date().getMonth() + 1);
  const anio = ( new Date().getFullYear()).toString();

if ( this.Formulario.anio === '') {
this.Periodo = [];
    } else if (this.Formulario.anio === '2018' || this.Formulario.anio === '2019' || this.Formulario.anio === '2020') {

      if (this.Formulario.anio === anio) {
        mes = (new Date().getMonth() + 1);

      } else {

        mes = 1;
   console.log(this.cargar);
      }
if ( this.area_negocio === '01'  || this.area_negocio === '05' ) {
  console.log(this.area_negocio);
  if ( mes >= 1 && mes < 5) {
    this.Periodo = [
      {
        'id': '1',
        'nombre': 'Enero'
      },
      {
        'id': '2',
        'nombre': 'Mayo'
      },
      {
        'id': '3',
        'nombre': 'Septiembre'
      }
    ];
  } else if ( mes >= 5 && mes < 8 ) {
    this.Periodo = [

      {
        'id': '2',
        'nombre': 'Mayo'
      },
      {
        'id': '3',
        'nombre': 'Septiembre'
      }
    ];
  } else if ( mes >= 8 &&  mes < 12 ) {
    this.Periodo = [
      {
        'id': '3',
        'nombre': 'Septiembre'
      }
    ];
  }
} else if ( this.area_negocio === '06' || this.area_negocio === '02' ) {{
let x , a ;
const arreglo = [];
console.log(this.area_negocio);
if ( mes === 1 ) {
  console.log('es un año nuevo');
  a = 0;
  for ( x = 0; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 2 ) {
   a = 0;
  for ( x = 1; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 3 ) {
  a = 0;
  for ( x = 2; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 4 ) {
  a = 0;
  for ( x = 3; x < 12 ; x++) {

    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 5 ) {
 a = 0;
  for ( x = 4; x < 12 ; x++) {

    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 6 ) {
 a = 0;
  for ( x = 5; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 7 ) {
 a = 0;
  for ( x = 6; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 8 ) {
 a = 0;
  for ( x = 7; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 9 ) {
 a = 0;
  for ( x = 8; x < 12 ; x++) {

    arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 10 ) {
 a = 0;
  for ( x = 9; x < 12 ; x++) {
    arreglo[a] = this.Meses[x];
    a++ ;
  }
  this.Periodo = arreglo;

} else if (mes === 11 ) {
 a = 0;
  for ( x = 10; x < 12 ; x++) {
   arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
} else if (mes === 12 ) {
 a = 0;
  for ( x = 11; x < 12 ; x++) {
     arreglo[a] = this.Meses[x];
    a++;
  }
  this.Periodo = arreglo;
}


  }

}
  }
}
Formato() {

 if (this.Formulario.periodo === '1' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '11';
  } else if (this.Formulario.periodo === '2' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '12';
  } else if (this.Formulario.periodo === '3' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '13';
  } else if (this.Formulario.periodo === '4' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '14';
  } else if (this.Formulario.periodo === '5' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '15';
  } else if (this.Formulario.periodo === '6' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '16';
  } else if (this.Formulario.periodo === '7' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '17';
  } else if (this.Formulario.periodo === '8' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '18';
  } else if (this.Formulario.periodo === '9' && this.area_negocio === '06') {
    this.Formulario.perido_Maestria = '19';
  } else if (this.Formulario.periodo === '10' && this.area_negocio === '06' ) {
    this.Formulario.perido_Maestria = '20';
  } else if (this.Formulario.periodo === '11' && this.area_negocio === '06' ) {
    this.Formulario.perido_Maestria = '21';
  } else if (this.Formulario.periodo === '12' && this.area_negocio === '06' ) {
    this.Formulario.perido_Maestria = '22';
  } else {
    this.Formulario.perido_Maestria = this.Formulario.periodo;
  }

  console.log(this.Formulario.perido_Maestria);

}

escoger() {
  if (this.id === '') { return; }
  const data = {
    consulta: 3,
    sede: this.Formulario.sede,
    facultad: this.Formulario.facultad,
    Id: this.id,
  };

  this.rest.Nuevo(data).subscribe(
    (rs) => {
      const datos = JSON.parse(rs.text());
      if (datos.exito) {

        this.carreras = datos.data;

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

}
