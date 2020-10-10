import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';

const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
