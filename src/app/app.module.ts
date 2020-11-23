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
import { EliminarUsuarioDialog, ModificarUsuarioDialog } from './componentes/usuario/modal-usuario/usuario-dialog';
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

@NgModule({
  declarations: [
    AppComponent,
    FormUsuarioComponent,
    TableUsuarioComponent,
    ModificarUsuarioDialog,
    EliminarUsuarioDialog,
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
    OlvideComponent
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
