import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';
import { NuevoTicketDialog } from '../modal-ticket/ticket-dialog';

@Component({
  selector: 'app-table-ticket',
  templateUrl: './table-ticket.component.html',
  styleUrls: ['./table-ticket.component.css']
})
export class TableTicketComponent implements OnInit {

  ticketList = [];
  ticketsCharged: boolean = false;
  message = "Cargando información";
  windowWidth: any;

  constructor(
    private dialog: MatDialog,
    private db: DbService,
    public alertaService: AlertaService
    ) { }

  ngOnInit(): void {

    this.windowWidth = window.innerWidth;
    this.getTickets();
  }

  async getTickets(){
    try{

      let response = await this.db.GetAllFrom('tickets');
      response.subscribe(res => {

        let formatedDate: Date;
        res.forEach((single: any) => {
          
          formatedDate = new Date(single.payload.doc.data().fecha.seconds * 1000);
          this.ticketList.push({
            id: single.payload.doc.id,
            cliente: single.payload.doc.data().cliente,
            clienteDetail: single.payload.doc.data().clienteDetail,
            estado: single.payload.doc.data().estado,
            fecha: single.payload.doc.data().fecha,
            fechaFormated: formatedDate.toLocaleDateString(),
            precioTotal: single.payload.doc.data().precioTotal
          });
        });

        if(this.ticketList == []){

          this.alertaService
            .openErrorSnackBar('No existen tickets registrados');
        }else{

          this.ticketsCharged = true;
        }
      });
    }catch(rej){

      this.alertaService
        .openErrorSnackBar('Ocurrio un problema al buscar los tickets');
    }
  }

  async newTicketDialog(){

    const dialogRef = this.dialog.open(NuevoTicketDialog, {
      width: '400px'
    });

    await dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){

        this.db.Create(result, 'tickets').then(() => {
          this.alertaService.openSuccessSnackBar('Ticket creado exitosamente');
        }).catch(() => {
          this.alertaService
            .openErrorSnackBar('Ocurrio un error al crear el ticket');
        });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = window.innerWidth;
  }

}
