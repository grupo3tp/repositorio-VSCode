import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/servicios/data-base.service';

@Component({
  selector: 'app-por-ubicacion',
  templateUrl: './por-ubicacion.component.html',
  styleUrls: ['./por-ubicacion.component.scss']
})
export class PorUbicacionComponent implements OnInit {

  constructor(public variableInyectada : DataBaseService) { }

  ngOnInit(): void {
    
  }

}
