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
import { HomeComponent } from './home/home.component';
import { ReservaComponent } from './reserva/reserva.component';
import { ComprasComponent } from './compras/compras.component';
<<<<<<< HEAD
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArticulosRotosComponent } from './listados/articulos-rotos/articulos-rotos.component';
import { HistorialArticulosComponent } from './historial-articulos/historial-articulos.component';
=======
>>>>>>> 416d7f301a3ee9d0e85fdf9885d62a6505167e5d



const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'nueva-acta', component: NuevaActaComponent},
  {path: 'marca', component: MarcasComponent},
  {path: 'articulos',component: ArticulosComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'sector', component:SectorComponent},
  {path: 'tipo', component:TipoComponent},
  {path: 'por-sector' , component:PorSectorComponent},
  {path: 'por-articulo', component:PorArticuloComponent},
  {path: 'por-ubicacion', component:PorUbicacionComponent},
  {path: 'reserva', component: ReservaComponent},
<<<<<<< HEAD
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'compras', component:ComprasComponent},
  {path: 'rotos', component:ArticulosRotosComponent},
  {path: 'historial',component:HistorialArticulosComponent},
=======
  {path: 'usuarios', component:ReservaComponent},
  {path: 'compras', component:ComprasComponent}
>>>>>>> 416d7f301a3ee9d0e85fdf9885d62a6505167e5d
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
