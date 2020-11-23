import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEmpleadoComponent } from './componentes/empleado/form-empleado/form-empleado.component';
import { TableEmpleadoComponent } from './componentes/empleado/table-empleado/table-empleado.component';
import { TableCompraComponent } from './componentes/compras/table-compra/table-compra.component';
import { FormProductoComponent } from './componentes/productos/form-producto/form-producto.component';
import { TableProductoComponent } from './componentes/productos/table-producto/table-producto.component';
import { DetalleTicketComponent } from './componentes/tickets/detalle-ticket/detalle-ticket.component';
import { TableTicketComponent } from './componentes/tickets/table-ticket/table-ticket.component';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';
import { LoginComponent } from './componentes/login/login/login.component';
import { OlvideComponent } from './componentes/login/olvide/olvide.component';
import { AuthGuard } from "./guards/auth.guard";
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { TableServiciosComponent } from './componentes/servicios/table-servicio/table-servicios.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { TablaClienteComponent } from './componentes/tabla-cliente/tabla-cliente.component';
import { MascotaComponent } from './componentes/mascota/mascota.component';
import { TableVentaComponent } from './componentes/ventas/table-venta/table-venta.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios/registro', component: FormUsuarioComponent,canActivate: [AuthGuard] },
  { path: 'usuarios/tabla', component: TableUsuarioComponent,canActivate: [AuthGuard] },
  { path: 'empleados/tabla', component:TableEmpleadoComponent, canActivate: [AuthGuard]},
  { path: 'empleados/registro', component:FormEmpleadoComponent, canActivate: [AuthGuard]},
  { path: 'servicio/registros',component: ServiciosComponent, canActivate: [AuthGuard]},
  { path: 'servicio/tabla', component: TableServiciosComponent, canActivate: [AuthGuard]},
  { path: 'productos/registro', component: FormProductoComponent, canActivate: [AuthGuard] },
  { path: 'productos/tabla', component: TableProductoComponent, canActivate: [AuthGuard] },
  { path: 'compras/tabla/:id', component: TableCompraComponent , canActivate: [AuthGuard] },
  { path: 'tickets/tabla', component: TableTicketComponent, canActivate: [AuthGuard] },
  { path: 'tickets/detalle/:id', component: DetalleTicketComponent, canActivate: [AuthGuard] },
  { path: 'clientes/registro', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'clientes/tabla', component: TablaClienteComponent, canActivate: [AuthGuard] },
  { path: 'mascota/tabla', component: MascotaComponent, canActivate: [AuthGuard]},
  { path: 'ventas/:id', component: TableVentaComponent, canActivate: [AuthGuard] },
  { path: 'login', component:LoginComponent},
  { path: 'login/olvide', component:OlvideComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
