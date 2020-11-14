import { Component, OnInit } from '@angular/core';
import { Articulos } from 'src/app/models/articulos.model';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-por-articulo',
  templateUrl: './por-articulo.component.html',
  styleUrls: ['./por-articulo.component.scss']
})
export class PorArticuloComponent implements OnInit {

  articulos : Array<Articulos> = new Array<Articulos>();

  constructor(private service : DataBaseService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.service.listArticulos().subscribe((SectorDesdeApi)=>{
      console.log(SectorDesdeApi)
      this.articulos = SectorDesdeApi;
      this.spinner.hide();
    }, error =>{
      this.spinner.hide();
    })

  }

}
