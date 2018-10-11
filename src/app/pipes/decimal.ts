import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({name: 'deci'})
export class PrimeroPipe implements PipeTransform{
    transform(value: any): string {
        let nombre = '';

     switch (value) {
        case '1':
        nombre = 'I';
            break;
        case '2':
              nombre = 'II';
               break;
           case '3':
           nombre = 'III';
                break;
                case '4':
        nombre = 'IV';
            break;
        case '5':
              nombre = 'V';
               break;
           case '6':
           nombre = 'VI';
                break;
                case '7':
        nombre = 'VII';
            break;
        case '8':
              nombre = 'VIII';
               break;
           case '9':
           nombre = 'IX';
                break;
                case '10':
                nombre = 'X';
                 break;
             case '11':
             nombre = 'XI';
                  break;
           }
            return nombre;
       }

}
