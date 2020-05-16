import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DataBaseService } from './servicios/data-base.service';
import { HttpClientModule } from '@angular/common/http';
import { NuevaActaComponent } from './nueva-acta/nueva-acta.component';
import { MarcasComponent } from './abm/marcas/marcas.component';
import { ArticulosComponent } from './abm/articulos/articulos.component';
import { SectorComponent } from './abm/sector/sector.component';
import { EquiposComponent } from './abm/equipos/equipos.component';
import { PorSectorComponent } from './listados/por-sector/por-sector.component';
import { PorArticuloComponent } from './listados/por-articulo/por-articulo.component';
import { PorUbicacionComponent } from './listados/por-ubicacion/por-ubicacion.component';
import { TipoComponent } from './abm/tipo/tipo.component';
import { HomeComponent } from './home/home.component';
import { ReservaComponent } from './reserva/reserva.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ComprasComponent } from './compras/compras.component';
<<<<<<< HEAD
import { ArticulosRotosComponent } from './listados/articulos-rotos/articulos-rotos.component';
import { HistorialArticulosComponent } from './historial-articulos/historial-articulos.component';
=======
>>>>>>> 416d7f301a3ee9d0e85fdf9885d62a6505167e5d


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    LoginComponent,
    NuevaActaComponent,
    MarcasComponent,
    ArticulosComponent,
    SectorComponent,
    EquiposComponent,
    PorSectorComponent,
    PorArticuloComponent,
    PorUbicacionComponent,
    TipoComponent,
    HomeComponent,
    ReservaComponent,
    UsuariosComponent,
    ComprasComponent,
<<<<<<< HEAD
    ArticulosRotosComponent,
    HistorialArticulosComponent,
=======
>>>>>>> 416d7f301a3ee9d0e85fdf9885d62a6505167e5d
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [
    DataBaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
