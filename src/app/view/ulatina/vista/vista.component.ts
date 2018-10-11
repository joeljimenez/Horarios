import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorrectorPipe } from './../../../pipes/corrector.pipe';
import { RestService } from './../../../service/rest.service';
import { NotificationsService } from 'angular2-notifications';
import { OpcionesNotifi } from '../../../service/parametros';
@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {
  horarios: any;
  data: any = {};
  materiaE: '';
  materia: '';
  options = new OpcionesNotifi().options;
  optionconfig = new OpcionesNotifi().config;
  flag_envio = false;

  constructor( private route: ActivatedRoute,
               private rest: RestService,
               private notificaciones: NotificationsService) {

    // this.data = {
    //   metodo: 200,
    //   sede: '001',
    //   cod_facultad: '002',
    //   cod_carrera: '210',
    //   cod_enfasis: '002',
    //   año: 2016,
    //   periodo: 1
    // };
   }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params['data'] != null) {
        try {
          // this.data.cedula = JSON.parse(atob(params['data'])).cedula;
          // this.data.iddocumento = JSON.parse(atob(params['data'])).iddocumento;
          // this.data.es_matricula = JSON.parse(atob(params['data'])).es_matricula;
          // this.data.idtransaccion = JSON.parse(atob(params['data'])).idtransaccion;
          // this.data = 'Factura de Matricula';
          this.data = JSON.parse(atob(params['data']));
          console.log(this.data);
          this.consulta_horarios();
        } catch (error) {
          window.history.back();
        }
      }
      else {
        window.history.back();
      }
    });
  }


  consulta_horarios() {
    this.flag_envio = true;
    this.rest.Servicios(this.data).subscribe(
      (rs) => {
        this.flag_envio = false;
        const datos = JSON.parse(CorrectorPipe.prototype.transform(rs.text())); /*agregar los pipes desde los metodos*/
        if (datos[0].exito) {
          this.horarios = datos[1].data;
          this.capsula_horario(datos[0].data);
          // {
          //   horario : ,
          //   division : datos[1].data

          // }
          console.log(datos[0].exito);
          console.log(this.horarios);
          console.log(datos[0].data);
        }
      },
      (err) => { },
      () => { }
      // tslint:disable-next-line:semicolon
    )

  }


  capsula_horario(a) {
    // asigna el cotenedor de la materias al grupo
    // tslint:disable-next-line:forin
    for (const g in this.horarios) {
      this.horarios[g].materias = [];
    }

    // recorre las materias
    // tslint:disable-next-line:forin
    for (const b in a) {
      // recorre los grupos
      // tslint:disable-next-line:forin
      for (const i in this.horarios) {
        // valida a que grupo pertenece la materia
        if (a[b].M14NIV == this.horarios[i].nivel) {

          // si este grupo no tiene materias agregadas crea la primera fila
          if (this.horarios[i].materias.length == 0) {
            // inserta la materia
            this.horarios[i].materias.push(
              { 'materia': a[b].M11DES, 'cod_materia': a[b].M11COD, 'modalidad': a[b].M23MOD, 'orden': a[b].Orden, 'grupos': [] }
            );

            // inserta el grupo
            this.horarios[i].materias[0].grupos.push(
              { 'grupo': a[b].M23GRU, 'cupos': a[b].M23MAX, 'matriculados': a[b].M23MAT, 'profesor': a[b].M26NOM, 'horarios': [] }
            );

            // inserta el horario
            this.horarios[i].materias[0].grupos[0].horarios.push(
              { 'dia': a[b].DIA, 'hinicio': a[b].M29HIN, 'hfin': a[b].M29HFI, 'salon': '', 'tipo': a[b].M23TIP, 'modo': a[b].M23MOD }
            );

          } else {
            // recorre las materias del grupo
            let existe_materia = false;
            // tslint:disable-next-line:curly
            // tslint:disable-next-line:forin
            for (const c in this.horarios[i].materias) {
              // valida si la materia ya esta registrada o no

              if (a[b].M11COD.trim() == this.horarios[i].materias[c].cod_materia.trim()) {
                // si los codigos de la materia son iguales validamos si el grupo existe o no
                existe_materia = true;
                let existe_grupo = false;
                for (const d in this.horarios[i].materias[c].grupos) {
                  if (a[b].M23GRU == this.horarios[i].materias[c].grupos[d].grupo) {
                    existe_grupo = true;
                    // si el grupo existe se inserta el horario
                    this.horarios[i].materias[c].grupos[d].horarios.push(
                      // tslint:disable-next-line:max-line-length
                      { 'dia': a[b].DIA, 'hinicio': a[b].M29HIN, 'hfin': a[b].M29HFI, 'salon': '', 'tipo': a[b].M23TIP, 'modo': a[b].M23MOD }
                    );
                    break;
                  }
                }
                // si el grupo no existe se inserta
                if (!existe_grupo) {
                  this.horarios[i].materias[c].grupos.push(
                    // tslint:disable-next-line:max-line-length
                    { 'grupo': a[b].M23GRU, 'cupos': a[b].M23MAX, 'matriculados': a[b].M23MAT, 'profesor': a[b].M26NOM, 'horarios': [] }
                  );
                  // tslint:disable-next-line:max-line-length
                  // por logica el ultimo grupo que se registre con un push sera siempre el ultimo por lo cual localizamos el ultimo registro

                  // tslint:disable-next-line:prefer-const
                  let ultimoh = this.horarios[i].materias[c].grupos.length - 1;
                  this.horarios[i].materias[c].grupos[ultimoh].horarios.push(
                    // tslint:disable-next-line:max-line-length
                    { 'dia': a[b].DIA, 'hinicio': a[b].M29HIN, 'hfin': a[b].M29HFI, 'salon': '', 'tipo': a[b].M23TIP, 'modo': a[b].M23MOD }
                  );
                }
                break;
              }
            }


            if (!existe_materia) {
              // inserta la materia
              this.horarios[i].materias.push(
                // tslint:disable-next-line:max-line-length
                { 'materia': a[b].M11DES, 'cod_materia': a[b].M11COD, 'modalidad': a[b].M23MOD, 'orden': a[b].Orden, 'grupos': [] }
              );
              // inserta el grupo
              // tslint:disable-next-line:prefer-const
              let ultimamat = this.horarios[i].materias.length - 1;
              this.horarios[i].materias[ultimamat].grupos.push(
                // tslint:disable-next-line:max-line-length
                { 'grupo': a[b].M23GRU, 'cupos': a[b].M23MAX, 'matriculados': a[b].M23MAT, 'profesor': a[b].M26NOM, 'horarios': [] }
              );
              // inserta el horario
              this.horarios[i].materias[ultimamat].grupos[0].horarios.push(
                // tslint:disable-next-line:max-line-length
                { 'dia': a[b].DIA, 'hinicio': a[b].M29HIN, 'hfin': a[b].M29HFI, 'salon': '', 'tipo': a[b].M23TIP, 'modo': a[b].M23MOD }
              );
            }



          }
          break;
        }
      }
    }

  }

  retorno() {
    window.history.back();
  }
}
