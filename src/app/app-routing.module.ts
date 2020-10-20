import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormEmpleadoComponent } from './componentes/empleado/form-empleado/form-empleado.component';
import { TableEmpleadoComponent } from './componentes/empleado/table-empleado/table-empleado.component';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';

const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
  { path: 'empleados/tabla', component:TableEmpleadoComponent},
  { path: 'empleados/registro', component:FormEmpleadoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
