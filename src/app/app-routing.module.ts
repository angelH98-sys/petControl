import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormEmpleadoComponent } from './componentes/empleado/form-empleado/form-empleado.component';
import { TableEmpleadoComponent } from './componentes/empleado/table-empleado/table-empleado.component';
import { TableCompraComponent } from './componentes/compras/table-compra/table-compra.component';
import { FormProductoComponent } from './componentes/productos/form-producto/form-producto.component';
import { TableProductoComponent } from './componentes/productos/table-producto/table-producto.component';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';
import {LoginComponent} from './componentes/login/login/login.component';
import { OlvideComponent } from './componentes/login/olvide/olvide.component';
import { ActualizarComponent } from './componentes/login/actualizar/actualizar.component';

const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
  { path: 'empleados/tabla', component:TableEmpleadoComponent},
  { path: 'empleados/registro', component:FormEmpleadoComponent},
  { path: 'productos/registro', component: FormProductoComponent },
  { path: 'productos/tabla', component: TableProductoComponent },
  { path: 'compras/tabla/:id', component: TableCompraComponent },
  { path: 'login', component:LoginComponent},
  { path: 'login/olvide', component:OlvideComponent},
  { path: 'login/actualizar', component:ActualizarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
