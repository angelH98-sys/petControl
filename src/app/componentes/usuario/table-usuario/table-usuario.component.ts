import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { EliminarUsuarioDialog, ModificarUsuarioDialog } from '../modal-usuario/usuario-dialog';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.css']
})
export class TableUsuarioComponent implements OnInit {

  dataSource: any;


  constructor(
    private db: DbService,
    private alertaService: AlertaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getUsuarios();
  }

  async getUsuarios(){
    try{
      let response = await this.db.GetAllFrom('usuario');
      response.subscribe(res => {
        let list = [];
        res.forEach((single: any) => {
          list.push({
            id: single.payload.doc.id,
            nombre: single.payload.doc.data().nombre,
            usuario: single.payload.doc.data().usuario,
            correo: single.payload.doc.data().correo,
          });
        });
        this.dataSource = new MatTableDataSource(list);
      });
    }catch(rej){
      this.alertaService.openErrorSnackBar('Error al cargar los usuarios');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async modifyDialog(usuario: any){
    const dialogRef = this.dialog.open(ModificarUsuarioDialog, {
      width: '250px',
      data: usuario
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != usuario){
        try{

          this.db.Update(result.id, {
            nombre: result.nombre,
            usuario: result.usuario,
            correo: result.correo
          }, 'usuario');
          
          this.getUsuarios();
          this.alertaService
            .openSuccessSnackBar('Usuario modificado exitosamente');
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al modificar el usuario');
        }
      }
    });
  }

  async deleteDialog(usuario: any){
    const dialogRef = this.dialog.open(EliminarUsuarioDialog, {
      width: '250px',
      data: usuario.nombre
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        try{

          this.db.Delete(usuario.id, 'usuario');
          this.getUsuarios();
          this.alertaService
            .openSuccessSnackBar('Usuario eliminado exitosamente');
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al eliminar el usuario');
        }
      }
    });
  }

}
