import { Component, OnInit } from '@angular/core';
import { Gerencia } from 'src/app/models/gerencia';
import { Sector } from 'src/app/models/sector';
import { TipoPuesto } from 'src/app/models/tipo-puesto';
import { UbicacionEdif } from 'src/app/models/ubicacion-edif';
import { DataBaseService } from 'src/app/servicios/data-base.service';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.scss']
})
export class SectoresComponent implements OnInit {

  sectores : Array<Sector> = new Array<Sector>();

  constructor( private service : DataBaseService) { }

  ngOnInit(): void {
    this.service.leerSectores().subscribe((SectorDesdeApi)=>{
      console.log(SectorDesdeApi)
      this.sectores = SectorDesdeApi;
    })
  }

}
