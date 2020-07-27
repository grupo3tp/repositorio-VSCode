import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import { Marca } from 'src/app/models/marca';
import { Tipo } from 'src/app/models/tipo';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {
  marcas : Array<Marca> = new Array<Marca>();
  tipo : Array<Tipo> = new Array<Tipo>();
 
  constructor(private servicio : DataBaseService) { }

  ngOnInit(): void {
    
  }


  agregar(){
  }

}
