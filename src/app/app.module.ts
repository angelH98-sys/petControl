import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './utilidades/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DeshabilitarUsuarioDialog, HabilitarUsuarioDialog, ModificarUsuarioDialog } from './componentes/usuario/modal-usuario/usuario-dialog';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { MascotaComponent } from './componentes/mascota/mascota.component';
import { TablaClienteComponent } from './componentes/tabla-cliente/tabla-cliente.component';
import { ModificarClienteDialog } from './componentes/cliente/modal-clientes/cliente-dialog';
import { EliminarClienteDialog } from './componentes/cliente/modal-clientes/cliente-dialog';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { TableServiciosComponent } from './componentes/servicios/table-servicio/table-servicios.component'
import { EliminarServiciosDialog, ModificarServiciosDialog } from './componentes/servicios/modal-servicio/servicios-dialog';
import { FormEmpleadoComponent } from './componentes/empleado/form-empleado/form-empleado.component';
import { TableEmpleadoComponent } from './componentes/empleado/table-empleado/table-empleado.component';
import { ModificarEmpleadoDialog } from './componentes/empleado/modal-empleado/empleado-dialog';
import { FormProductoComponent } from './componentes/productos/form-producto/form-producto.component';
import { TableProductoComponent } from './componentes/productos/table-producto/table-producto.component';
import { AprobarProductoDialog, ModificarProductoDialog } from './componentes/productos/modal-producto/producto-dialog';
import { TableCompraComponent } from './componentes/compras/table-compra/table-compra.component';
import { AprobarCompraDialog, CancelarCompraDialog, ModificarCompraDialog, NuevaCompraDialog } from './componentes/compras/modal-compra/compra-dialog';
import { LoginComponent } from './componentes/login/login/login.component';
import { OlvideComponent } from './componentes/login/olvide/olvide.component';
import { EfectuarTicketDialog, ModificarTicketDialog, NuevoTicketDialog } from './componentes/tickets/modal-ticket/ticket-dialog';
import { TableTicketComponent } from './componentes/tickets/table-ticket/table-ticket.component';
import { EliminarVentaDialog, ModificarVentaDialog, NuevaVentaDialog } from './componentes/ventas/modal-venta/venta-dialog';
import { EliminarCitaDialog, ModificarCitaDialog, NuevaCitaDialog } from './componentes/citas/modal-cita/cita-dialog';
import { DetalleTicketComponent } from './componentes/tickets/detalle-ticket/detalle-ticket.component';
import { TableVentaComponent } from './componentes/ventas/table-venta/table-venta.component';

@NgModule({
  declarations: [
    AppComponent,
    FormUsuarioComponent,
    TableUsuarioComponent,
    ModificarUsuarioDialog,
    DeshabilitarUsuarioDialog,
    HabilitarUsuarioDialog,
    ClienteComponent,
    MascotaComponent,
    TablaClienteComponent,
    ModificarClienteDialog,
    EliminarClienteDialog,
    ServiciosComponent,
    TableServiciosComponent,
    EliminarServiciosDialog,
    ModificarServiciosDialog,
    FormEmpleadoComponent,
    TableEmpleadoComponent,
    ModificarEmpleadoDialog,
    FormProductoComponent,
    TableProductoComponent,
    ModificarProductoDialog,
    TableCompraComponent,
    NuevaCompraDialog,
    AprobarProductoDialog,
    AprobarCompraDialog,
    ModificarCompraDialog,
    CancelarCompraDialog,
    LoginComponent,
    OlvideComponent,
    NuevoTicketDialog,
    TableTicketComponent,
    NuevaVentaDialog,
    NuevaCitaDialog,
    DetalleTicketComponent,
    ModificarVentaDialog,
    ModificarCitaDialog,
    EliminarVentaDialog,
    EliminarCitaDialog,
    ModificarTicketDialog,
    EfectuarTicketDialog,
    TableVentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
