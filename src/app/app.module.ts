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
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { MascotaComponent } from './componentes/mascota/mascota.component';
import { TablaClienteComponent } from './componentes/tabla-cliente/tabla-cliente.component';
import {ModificarClienteDialog} from './componentes/cliente/modal-clientes/cliente-dialog';
import {EliminarClienteDialog} from './componentes/cliente/modal-clientes/cliente-dialog';

@NgModule({
  declarations: [
    AppComponent,
    FormUsuarioComponent,
    TableUsuarioComponent,
    ModificarUsuarioDialog,
    EliminarUsuarioDialog,
    ClienteComponent,
    MascotaComponent,
    TablaClienteComponent,
    EliminarClienteDialog,
    ModificarClienteDialog,
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
