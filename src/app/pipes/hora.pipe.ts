import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: number): String {
    
    let hora = parseInt((value  / 100).toString(), 0);
    const minutos = value % 100;
    let periodo = '';
    if (hora === 12 ){
      periodo = ' p.m';
    }
    else if (hora > 12)
    {
      hora = hora - 12;
      periodo = ' p.m';
    }
    else
    {
      periodo = ' a.m';
    }


    
    
    return this.ceros_izquierda((hora).toString(), 2) + ':' + this.ceros_izquierda( (minutos).toString(), 2) + ' ' + periodo ;
  }


  ceros_izquierda (valor, cantidad) {
    /*concatena ceros a la izquierda*/
    let respuesta = valor.toString();

    cantidad = cantidad - respuesta.length;

    for (let i = 0; i < cantidad; i++) {
        respuesta = '0' + respuesta;
    }

    return respuesta;

};

}

// app.filter("tipoclase", function () {
//   return function (tipo) {
//       var retorno = '';
//       switch (tipo) {
//           case "N":
//               retorno = "Normal";
//               break;
//           case "T":
//               retorno = "Tutoria";
//               break;
//           case "S":
//               retorno = "Suficiencia";
//               break;
//           case "V":
//               retorno = "Virtual";
//               break;
//           case "E":
//               retorno = "Especial";
//               break;
//           default:
//               break;
//       }
//       return retorno;
//   }
// });

// app.filter("modoclase", function () {
//   return function (tipo) {
//       var retorno = '';
//       switch (tipo) {
//           case "P":
//               retorno = "Presencial";
//               break;
//           case "S":
//               retorno = "Semi presencial";
//               break;
//           case "V":
//               retorno = "Virtual";
//               break;
//           default:
//               break;
//       }
//       return retorno;
//   }
// });

// app.filter("modonivel", function () {
//   return function (tipo, n) {
//       var retorno = '';
//       switch (tipo) {
//           case 'C':
//               retorno = ['Cuatrimestre', 'Cuatrimestres'];
//               break;
//           case 'S':
//               retorno = ['Semestre', 'Semestres'];
//               break;
//           case 'M':
//               retorno = ['Nivel', 'Niveles'];
//               break;
//       }
//       return retorno[n];
//   }
// });
