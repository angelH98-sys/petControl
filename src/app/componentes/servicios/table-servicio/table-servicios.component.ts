import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { EliminarServiciosDialog, ModificarServiciosDialog } from '../modal-servicio/servicios-dialog';

@Component({
  selector: 'app-table-servicios',
  templateUrl: './table-servicios.component.html',
  styleUrls: ['./table-servicios.component.css']
})
export class TableServiciosComponent implements OnInit {

  dataSource: any;


  constructor(
    private db: DbService,
    private alertaService: AlertaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getServicios();
  }

  async getServicios(){
    try{
      let response = await this.db.GetAllFrom('servicio');
      response.subscribe(res => {
        let list = [];
        res.forEach((single: any) => {
          list.push({
            id: single.payload.doc.id,
            nombre: single.payload.doc.data().nombre,
            descripcion: single.payload.doc.data().descripcion,
            duracion: single.payload.doc.data().duracion,
            precio: single.payload.doc.data().precio,
            empleado: single.payload.doc.data().empleado,
          });
        });
        this.dataSource = new MatTableDataSource(list);
      });
    }catch(rej){
      this.alertaService.openErrorSnackBar('Error al cargar los servicios');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async modifyDialog(servicio: any){
    const dialogRef = this.dialog.open(ModificarServiciosDialog, {
      width: '250px',
      data: servicio
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != servicio){
        try{

          this.db.Update(result.id, {
            nombre: result.nombre,
            descripcion: result.descripcion,
            duracion: result.duracion,
            precio: result.precio,
            empleado: result.empleado,
          }, 'servicio');
          
          this.getServicios();
          this.alertaService
            .openSuccessSnackBar('Servicio modificado exitosamente');
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al modificar el servicio');
        }
      }
    });
  }

  async deleteDialog(servicio: any){
    const dialogRef = this.dialog.open(EliminarServiciosDialog, {
      width: '250px',
      data: servicio.nombre
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        try{

          this.db.Delete(servicio.nombre, 'servicio');
          this.getServicios();
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
