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
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import{ TableServiciosComponent} from './componentes/servicios/table-servicio/table-servicios.component'
import { EliminarServiciosDialog, ModificarServiciosDialog } from './componentes/servicios/modal-servicio/servicios-dialog';

@NgModule({
  declarations: [
    AppComponent,
    FormUsuarioComponent,
    TableUsuarioComponent,
    ModificarUsuarioDialog,
    EliminarUsuarioDialog,
    ServiciosComponent,
    TableServiciosComponent,
    EliminarServiciosDialog,
    ModificarServiciosDialog
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
