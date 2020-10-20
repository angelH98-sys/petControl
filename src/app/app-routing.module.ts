import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';
import { ClienteComponent} from './componentes/cliente/cliente.component';
import {TablaClienteComponent} from './componentes/tabla-cliente/tabla-cliente.component';
import{MascotaComponent} from './componentes/mascota/mascota.component';

const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
  { path: 'clientes/registro', component: ClienteComponent },
  { path: 'clientes/tabla', component: TablaClienteComponent },
  { path: 'mascota/tabla', component: MascotaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
