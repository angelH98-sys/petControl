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
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios/registro', component: FormUsuarioComponent,canActivate: [AuthGuard] },
  { path: 'usuarios/tabla', component: TableUsuarioComponent,canActivate: [AuthGuard] },
  { path: 'empleados/tabla', component:TableEmpleadoComponent, canActivate: [AuthGuard]},
  { path: 'empleados/registro', component:FormEmpleadoComponent, canActivate: [AuthGuard]},
  { path: 'productos/registro', component: FormProductoComponent, canActivate: [AuthGuard] },
  { path: 'productos/tabla', component: TableProductoComponent,canActivate: [AuthGuard] },
  { path: 'compras/tabla/:id', component: TableCompraComponent ,canActivate: [AuthGuard] },
  { path: 'login', component:LoginComponent},
  { path: 'login/olvide', component:OlvideComponent},
  { path: 'login/actualizar', component:ActualizarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
