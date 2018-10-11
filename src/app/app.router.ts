import { Routes, RouterModule } from '@angular/router';
import { UlatinaComponent } from './view/ulatina/ulatina.component';
import { UamComponent } from './view/uam/uam.component';
import { OpcionesComponent } from './view/opciones/opciones.component';
import { VistaComponent } from './view/ulatina/vista/vista.component';
import { FormularioComponent } from './view/ulatina/Formulario/Formulario.component';

const appRoutes: Routes =   [
    // tslint:disable-next-line:max-line-lengt
    { path: 'Matricula', component: FormularioComponent },
    { path: 'Ulatina', component: UlatinaComponent },
    { path: 'Uam', component: UamComponent },
    { path: 'Opciones', component: OpcionesComponent },
    { path: 'visor/:data', component: VistaComponent},
    { path: '**', redirectTo: 'Matricula' }
];

export const routing = RouterModule.forRoot(appRoutes);

export const views = [UlatinaComponent, UamComponent, OpcionesComponent, VistaComponent, FormularioComponent];
