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
import { FormProductoComponent } from './componentes/productos/form-producto/form-producto.component';
import { TableProductoComponent } from './componentes/productos/table-producto/table-producto.component';
import { AprobarProductoDialog, ModificarProductoDialog } from './componentes/productos/modal-producto/producto-dialog';
import { TableCompraComponent } from './componentes/compras/table-compra/table-compra.component';
import { AprobarCompraDialog, CancelarCompraDialog, ModificarCompraDialog, NuevaCompraDialog } from './componentes/compras/modal-compra/compra-dialog';
import { NuevoTicketDialog } from './componentes/tickets/modal-ticket/ticket-dialog';
import { TableTicketComponent } from './componentes/tickets/table-ticket/table-ticket.component';
import { NuevaVentaDialog } from './componentes/ventas/modal-venta/venta-dialog';

@NgModule({
  declarations: [
    AppComponent,
    FormUsuarioComponent,
    TableUsuarioComponent,
    ModificarUsuarioDialog,
    DeshabilitarUsuarioDialog,
    HabilitarUsuarioDialog,
    FormProductoComponent,
    TableProductoComponent,
    ModificarProductoDialog,
    TableCompraComponent,
    NuevaCompraDialog,
    AprobarProductoDialog,
    AprobarCompraDialog,
    ModificarCompraDialog,
    CancelarCompraDialog,
    NuevoTicketDialog,
    TableTicketComponent,
    NuevaVentaDialog
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
