import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { ModificarEmpleadoDialog } from '../modal-empleado/empleado-dialog';

@Component({
  selector: 'app-table-empleado',
  templateUrl: './table-empleado.component.html',
  styleUrls: ['./table-empleado.component.css']
})
export class TableEmpleadoComponent implements OnInit {

  dataSource: any;

  constructor(
    private db: DbService,
    private alertaService: AlertaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getEmpleados();
  }

  async getEmpleados(){
    try{
      let response = await this.db.GetAllFrom('empleado');
      response.subscribe(res => {
        let list = [];
        res.forEach((single: any) => {
          list.push({
            id: single.payload.doc.id,
            nombre: single.payload.doc.data().nombre,
            telefono: single.payload.doc.data().telefono,
            correo: single.payload.doc.data().correo,
            dui:single.payload.doc.data().dui,
            especialidad:single.payload.doc.data().especialidad,
            estado:single.payload.doc.data().estado
          });
        });
        this.dataSource = new MatTableDataSource(list);
      });
    }catch(rej){
      this.alertaService.openErrorSnackBar('Error al cargar los empleados');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async modifyDialog(empleado: any){
    const dialogRef = this.dialog.open(ModificarEmpleadoDialog, {
      width: '250px',
      data: empleado
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != empleado){
        console.log(result);
        try{

          this.db.Update(result.id, {
            nombre: result.nombre,
            telefono: result.telefono,
            correo: result.correo,
            dui:result.dui,
            especialidad:result.especialidad,
            estado:result.estado
          }, 'empleado');
          
          this.getEmpleados();
          this.alertaService
            .openSuccessSnackBar('Empleado modificado exitosamente');
        }catch(rej){
          this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al modificar el Empleado');
        }
      }
    });
  }

  async deleteDialog(usuario: any){
    /*const dialogRef = this.dialog.open(EliminarUsuarioDialog, {
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
    });*/
  }

}
