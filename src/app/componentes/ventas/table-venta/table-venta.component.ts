import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/utilidades/alerta.service';
import { DbService } from 'src/app/utilidades/db.service';

@Component({
  selector: 'app-table-venta',
  templateUrl: './table-venta.component.html',
  styleUrls: ['./table-venta.component.css']
})
export class TableVentaComponent implements OnInit {

  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public alertaService: AlertaService,
    private db: DbService
    ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == undefined){
      this.router.navigate(['/productos/tabla']);
    }

  }

  async getVentas(){
    
    try{

      //let response = await this.db.GetDocWith('')
    }catch(e){

      this.alertaService
        .openErrorSnackBar('No fue posible acceder a las ventas');
      this.router.navigate(['/productos/tabla']);
    }
  }

}