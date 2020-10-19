import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { DeshabilitarUsuarioDialog, HabilitarUsuarioDialog, ModificarUsuarioDialog } from '../modal-usuario/usuario-dialog';

@Component({
  selector: 'app-table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.css']
})
export class TableUsuarioComponent implements OnInit {

  dataSource = new MatTableDataSource();
  message = "Cargando información";
  tableCharged = false;
  windowWidth: any;

  constructor(
    private db: DbService,
    private alertaService: AlertaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getUsuarios();
    this.windowWidth = window.innerWidth;
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
            estado: single.payload.doc.data().estado,
            permiso: single.payload.doc.data().permiso
          });
        });
        if(list.length > 0){
          this.dataSource = new MatTableDataSource(list);
        }else{
          this.message = "No se encontraron usuarios registrados";
        }
        this.tableCharged = true;
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
      width: '500px',
      data: usuario
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != usuario){
        try{

          this.db.Update(result.id, {
            nombre: result.nombre,
            usuario: result.usuario,
            correo: result.correo,
            estado: result.estado,
            permiso: result.permiso
          }, 'usuario').then(() => {
            this.getUsuarios();
            this.alertaService
              .openSuccessSnackBar('Usuario modificado exitosamente');
          }).catch(() => {
            this.alertaService
              .openErrorSnackBar('Ocurrio un error al modificar el usuario');
          });
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ocurrio un error al modificar el usuario');
        }
      }
    });
  }

  async deshabilitarDialog(usuario: any){
    const dialogRef = this.dialog.open(DeshabilitarUsuarioDialog, {
      width: '500px',
      data: usuario.nombre
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result){
        try{

          this.db.Update(usuario.id, {
            estado: 'Deshabilitado'
          }, 'usuario').then(() => {
            this.getUsuarios();
            this.alertaService
              .openSuccessSnackBar('Usuario deshabilitado exitosamente');
          }).catch(() => {
            this.alertaService
            .openErrorSnackBar('Ocurrio un error al deshabilitar el usuario');
          });  
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ocurrio un error al deshabilitar el usuario');
        }
      }
    });
  }

  async habilitarDialog(usuario: any){
    const dialogRef = this.dialog.open(HabilitarUsuarioDialog, {
      width: '500px',
      data: usuario.nombre
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result){
        try{

          this.db.Update(usuario.id, {
            estado: 'Habilitado'
          }, 'usuario').then(() => {
            this.getUsuarios();
            this.alertaService
              .openSuccessSnackBar('Usuario habilitado exitosamente');
          }).catch(() => {
            this.alertaService
            .openErrorSnackBar('Ocurrio un error al habilitar el usuario');
          });  
        }catch(rej){

          this.alertaService
            .openErrorSnackBar('Ocurrio un error al habilitar el usuario');
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

}
