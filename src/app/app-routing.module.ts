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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArticulosRotosComponent } from './listados/articulos-rotos/articulos-rotos.component';
import { HistorialArticulosComponent } from './historial-articulos/historial-articulos.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { ActasComponent } from './actas/actas.component';
import { CargaGranelComponent } from './carga-granel/carga-granel.component';
import { PerfilComponent } from './perfil/perfil.component';



const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'nueva-acta', component: NuevaActaComponent},
  {path: 'actas' , component:ActasComponent},
  {path: 'marca', component: MarcasComponent},
  {path: 'articulos',component: ArticulosComponent},
  {path: 'equipos', component: EquiposComponent},
  {path: 'sector', component:SectorComponent},
  {path: 'tipo', component:TipoComponent},
  {path: 'por-sector' , component:PorSectorComponent},
  {path: 'por-articulo', component:PorArticuloComponent},
  {path: 'por-ubicacion', component:PorUbicacionComponent},
  {path: 'reserva', component: ReservaComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'compras', component:ComprasComponent},
  {path: 'articulos-rotos', component:ArticulosRotosComponent},
  {path: 'historial',component:HistorialArticulosComponent},
  {path: 'login', component:LoginComponent},
  {path: 'cargaGranel', component:CargaGranelComponent},
  {path: 'perfil', component:PerfilComponent}, 
  {path: '**', component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
