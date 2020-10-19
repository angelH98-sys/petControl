import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';
import{ ServiciosComponent} from './componentes/servicios/servicios.component';

const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
  { path: 'servicio/registro',component: ServiciosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
