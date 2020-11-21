import { NgModule } from '@angular/core';
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
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { TableServiciosComponent } from './componentes/servicios/table-servicio/table-servicios.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { TablaClienteComponent } from './componentes/tabla-cliente/tabla-cliente.component';
import { MascotaComponent } from './componentes/mascota/mascota.component';
import { TableVentaComponent } from './componentes/ventas/table-venta/table-venta.component';
  
const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
  { path: 'servicio/registros',component: ServiciosComponent},
  { path: 'servicio/tabla', component: TableServiciosComponent },
  { path: 'empleados/tabla', component: TableEmpleadoComponent},
  { path: 'empleados/registro', component: FormEmpleadoComponent},
  { path: 'productos/registro', component: FormProductoComponent },
  { path: 'productos/tabla', component: TableProductoComponent },
  { path: 'compras/tabla/:id', component: TableCompraComponent },
  { path: 'tickets/tabla', component: TableTicketComponent },
  { path: 'tickets/detalle/:id', component: DetalleTicketComponent },
  { path: 'clientes/registro', component: ClienteComponent },
  { path: 'clientes/tabla', component: TablaClienteComponent },
  { path: 'mascota/tabla', component: MascotaComponent},
  { path: 'ventas/:id', component: TableVentaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
