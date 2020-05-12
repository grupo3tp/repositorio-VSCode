import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevaActaComponent } from './nueva-acta/nueva-acta.component';
import { MarcasComponent } from './abm/marcas/marcas.component';
import { ArticulosComponent } from './abm/articulos/articulos.component';
import { EquiposComponent } from './abm/equipos/equipos.component';
import { SectorComponent } from './abm/sector/sector.component';
import { PorSectorComponent } from './listados/por-sector/por-sector.component';
import { PorArticuloComponent } from './listados/por-articulo/por-articulo.component';
import { PorUbicacionComponent } from './listados/por-ubicacion/por-ubicacion.component';
import { TipoComponent } from './abm/tipo/tipo.component';



const routes: Routes = [
  {path: 'nueva-acta', component: NuevaActaComponent},
  {path: 'marca', component: MarcasComponent},
  {path: 'articulos',component: ArticulosComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'sector', component:SectorComponent},
  {path: 'tipo', component:TipoComponent},
  {path: 'por-sector' , component:PorSectorComponent},
  {path: 'por-articulo', component:PorArticuloComponent},
  {path: 'por-ubicacion', component:PorUbicacionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
