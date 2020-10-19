import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { EliminarClienteDialog, ModificarClienteDialog } from '../cliente/modal-clientes/cliente-dialog';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.css']
})
export class TablaClienteComponent implements OnInit {
  dataSource: any;


  constructor(
    private db: DbService,
    private alertaService: AlertaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getClientes();
  }

  async getClientes(){
    try{
      let response = await this.db.GetAllFrom('cliente');
      response.subscribe(res => {
        let list = [];
        res.forEach((single: any) => {
          list.push({
            id: single.payload.doc.id,
            nombre: single.payload.doc.data().nombre,
            telefono: single.payload.doc.data().telefono,
            correo: single.payload.doc.data().correo,
            dui: single.payload.doc.data().dui,
            mascota: single.payload.doc.data().mascota,
          });
        });
        this.dataSource = new MatTableDataSource(list);
      });
    }catch(rej){
      this.alertaService.openErrorSnackBar('Error al cargar los clientes');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async modifyDialog(cliente: any){
    const dialogRef = this.dialog.open(ModificarClienteDialog, {
      width: '250px',
      data: cliente
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != cliente){
        try{

          this.db.Update(result.id, {
            nombre: result.nombre,
            telefono: result.telefono,
            correo: result.correo,
            dui: result.dui,
            mascota:result.mascota
          }, 'cliente');
          
          this.getClientes();
          this.alertaService
            .openSuccessSnackBar('Cliente modificado exitosamente');
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al modificar el Cliente');
        }
      }
    });
  }

  async deleteDialog(cliente: any){
    const dialogRef = this.dialog.open(EliminarClienteDialog, {
      width: '250px',
      data: cliente.nombre
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        try{

          this.db.Delete(cliente.id, 'cliente');
          this.getClientes();
          this.alertaService
            .openSuccessSnackBar('Cliente eliminado exitosamente');
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ups... Ocurrio un error al eliminar el cliente');
        }
      }
    });
  }
    }
  
  
