import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({name:'letra'})
export class LetraPipe implements PipeTransform{
    transform(value: any): string {
        let nombre = '';
       switch (value) {
        case 'C':
        nombre = 'Cuatrimestres';
            break;
        case 'S':
              nombre = 'Semestres';
               break;
           case 'M':
           nombre= 'Niveles';
                break;
           }
            return nombre;
        }
}
