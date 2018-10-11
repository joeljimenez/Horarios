import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
    apiUrl1 = 'https://matricula.ulatina.edu.pa/';
    urlFijo = 'https://service.ulatina.edu.pa/';
    apiUrl2 = 'http://localhost:54636/';
   // apiUrl = 'http://localhost:8394/';
  constructor(private http: Http) { }
  // tslint:disable-next-line:member-ordering
  private headers: any = new Headers({ 'Content-type': 'application/json' });

   Servicios(data) {
    return this.http.post(this.apiUrl1 + 'api/service_estudiante', data, this.headers );
   }

  ServiciosMatricula(data) {
    return this.http.post(this.urlFijo + 'api/APIProspecto', data , this.headers );
  }
Nuevo(data) {
    return this.http.post(this.urlFijo + 'api/APICarreras', data , this.headers );
  }

  }


