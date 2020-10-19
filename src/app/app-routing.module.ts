import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableCompraComponent } from './componentes/compras/table-compra/table-compra.component';
import { FormProductoComponent } from './componentes/productos/form-producto/form-producto.component';
import { TableProductoComponent } from './componentes/productos/table-producto/table-producto.component';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { TableUsuarioComponent } from './componentes/usuario/table-usuario/table-usuario.component';

const routes: Routes = [
  { path: 'usuarios/registro', component: FormUsuarioComponent },
  { path: 'usuarios/tabla', component: TableUsuarioComponent },
  { path: 'productos/registro', component: FormProductoComponent },
  { path: 'productos/tabla', component: TableProductoComponent },
  { path: 'compras/tabla/:id', component: TableCompraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
