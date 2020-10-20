import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulos } from '../models/articulos.model';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';
import {Transporte} from '../models/transporte';
import {Sector} from '../models/sector';
import {Usuarios} from '../models/usuarios'
import { CookieService } from "ngx-cookie-service";
import { Equipo } from '../models/equipo';
import { Remito } from '../models/remito';
import { NuevaActa } from '../models/nueva-acta';
import { Tipo } from '../models/tipo';
import { OrdenCompra } from '../models/orden-compra';
import { Estado } from '../models/estado';
import { Historial } from '../models/historial';
import { CargaGranel } from '../models/carga-granel';
import { TipoPuesto } from '../models/tipo-puesto';
import { Gerencia } from '../models/gerencia';
import { UbicacionEdif } from '../models/ubicacion-edif';
import { Valor } from '../models/valor';
import { Provincias } from '../models/provincias';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
 
  URL:string = "http://localhost:3300/api"
  

  constructor(private http : HttpClient, private cookies: CookieService) { }

  login(user: any): Observable<any> {
    return this.http.post(this.URL+"/autentificacion", user);
  }
  
  guardarLocalStorage(token: any){
    sessionStorage.setItem('Token' , JSON.stringify(token))
  }
  guardarLocalStorageId(nivel: any){
    sessionStorage.setItem('idNivel' , JSON.stringify(nivel))
  }
  logintoken(token: any): Observable<any> {
     return this.http.post(this.URL+"/token",token)
  }
  borrarLocalStorage(){
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("idNivel");
  }
 
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken():boolean {
     return (this.cookies.check("token"));
  }
  logout() {
     this.cookies.delete('token');
  }
  //----------fin login

  leerArticulos():Observable<Articulos[]>
  {
      return this.http.get<Articulos[]>(this.URL+'/articulos')
  }
  GuardarArticulos(art:Articulos) : Observable<Articulos>
  {
    return this.http.post<Articulos>(this.URL+'/articulos', art)
  };
  ActualizarArticulos(art:Articulos, id:number)
  {
    return this.http.put<Articulos>(this.URL+'/articulos/'+id, art);
  };
  EliminarArticulos(id:number)
  {
    return this.http.delete<Articulos>(this.URL+'/articulos/'+id)
  }
  //----------------fin articulos

  leerEstado():Observable<Estado[]>
  {
      return this.http.get<Estado[]>(this.URL+'/estado')
  }

  leerOrdenCompra():Observable<OrdenCompra[]>
  {
      return this.http.get<OrdenCompra[]>(this.URL+'/ordenCompra')
  }
  GuardarOrdenCompra(ord:OrdenCompra) : Observable<OrdenCompra>
  {
    return this.http.post<OrdenCompra>(this.URL+'/ordenCompra', ord)
  };
  ActualizarOrdenCompra(ord:OrdenCompra, id:number)
  {
    return this.http.put<OrdenCompra>(this.URL+'/ordenCompra/'+id, ord);
  };
  EliminarOrdenCompra(id:number)
  {
    return this.http.delete<OrdenCompra>(this.URL+'/ordenCompra/'+id)
  }
  //----------------fin OrdenCompra

  leerMarca():Observable<Marca[]>
  {
    return this.http.get<Marca[]>(this.URL+'/marca')
  };
  GuardarMarca(marca:Marca) : Observable<Marca>
  {
    return this.http.post<Marca>(this.URL+'/marca', marca)
  };
  ActualizarMarca(marca:Marca, id:number)
  {
    return this.http.put<Marca>(this.URL+'/marca/'+id, marca);
  };
  EliminarMarca(id:number)
  {
    return this.http.delete<Marca>(this.URL+'/marca/'+id)
  }
  //------------------ fin marca

  leerTipo():Observable<Tipo[]>
  {
    return this.http.get<Tipo[]>(this.URL+'/tipo')
  };
  GuardarTipo(tipo:Tipo) : Observable<Tipo>
  {
    return this.http.post<Tipo>(this.URL+'/tipo', tipo)
  };
  ActualizarTipo(tipo:Tipo, id:number)
  {
    return this.http.put<Marca>(this.URL+'/tipo/'+id, tipo);
  };
  EliminarTipo(id:number)
  {
    return this.http.delete<Marca>(this.URL+'/tipo/'+id)
  }
  //------------------ fin Tipo

  leerSector():Observable<Sector[]>
  {
    return this.http.get<[]>(this.URL+'/sector')
  };
  leerSectorxId(id:number):Observable<Sector[]>
  {
    return this.http.get<[]>(this.URL+'/sector/'+id)
  };
  GuardarSector(sector:Sector) : Observable<Sector>
  {
    return this.http.post<Sector>(this.URL+'/sector', sector)
  };
  ActualizarSector(sector:Sector, id:number)
  {
    return this.http.put<Sector>(this.URL+'/sector/'+id, sector);
  };
  EliminarSector(id:number)
  {
    return this.http.delete<Sector>(this.URL+'/sector/'+id)
  }
  //-------------- fin sector

  leerTipoPuesto():Observable<TipoPuesto[]>
  {
    return this.http.get<[]>(this.URL+'/tipoPuesto')
  };
  GuardarTipoPuesto(sector:TipoPuesto) : Observable<TipoPuesto>
  {
    return this.http.post<TipoPuesto>(this.URL+'/tipoPuesto', sector)
  };
  ActualizarTipoPuesto(sector:TipoPuesto, id:number)
  {
    return this.http.put<TipoPuesto>(this.URL+'/tipoPuesto/'+id, sector);
  };
  EliminarTipoPuesto(id:number)
  {
    return this.http.delete<TipoPuesto>(this.URL+'/tipoPuesto/'+id)
  }
  //-------------- fin TipoPuesto

  leerGerencia():Observable<Gerencia[]>
  {
    return this.http.get<[]>(this.URL+'/gerencia')
  };
  GuardarGerencia(sector:Gerencia) : Observable<Gerencia>
  {
    return this.http.post<Gerencia>(this.URL+'/gerencia', sector)
  };
  ActualizarGerencia(sector:Gerencia, id:number)
  {
    return this.http.put<Gerencia>(this.URL+'/gerencia/'+id, sector);
  };
  EliminarGerencia(id:number)
  {
    return this.http.delete<Gerencia>(this.URL+'/gerencia/'+id)
  }
  //-------------- fin Gerencia

  leerUbicacionEdif():Observable<UbicacionEdif[]>
  {
    return this.http.get<[]>(this.URL+'/UbicacionEdif')
  };
  GuardarUbicacionEdif(sector:UbicacionEdif) : Observable<UbicacionEdif>
  {
    return this.http.post<UbicacionEdif>(this.URL+'/UbicacionEdif', sector)
  };
  ActualizarUbicacionEdif(sector:UbicacionEdif, id:number)
  {
    return this.http.put<UbicacionEdif>(this.URL+'/UbicacionEdif/'+id, sector);
  };
  EliminarUbicacionEdif(id:number)
  {
    return this.http.delete<UbicacionEdif>(this.URL+'/UbicacionEdif/'+id)
  }
  //-------------- fin UbicacionEdif

  leerProvincias():Observable<Provincias[]>
  {
    return this.http.get<[]>(this.URL+'/distritos')
  };
  GuardarProvincias(sector:Provincias) : Observable<Provincias>
  {
    return this.http.post<Provincias>(this.URL+'/distritos', sector)
  };
  ActualizarProvincias(sector:Provincias, id:number)
  {
    return this.http.put<Provincias>(this.URL+'/distritos/'+id, sector);
  };
  EliminarProvincias(id:number)
  {
    return this.http.delete<Provincias>(this.URL+'/distritos/'+id)
  }
  //---------------fin provincias
  leerTransporte():Observable<Transporte[]>
  {
      return this.http.get<Transporte[]>(this.URL+'/transporte')
  };
  //----------------fin trasporte

  leerUsuarios():Observable<Usuarios[]>
  {
    return this.http.get<[Usuarios]>(this.URL+'/usuarios')
  };
  leerUnUsuario(user:string):Observable<Usuarios[]>
  {
    return this.http.get<[Usuarios]>(this.URL+'/usuarios/'+user)
  }
  GuardarUsuarios(user:Usuarios) : Observable<Usuarios>
  {
    return this.http.post<Usuarios>(this.URL+'/usuarios', user)
  };
  ActualizarUsuarios(user:Usuarios, id:number)
  {
    return this.http.put<Usuarios>(this.URL+'/usuarios/'+id, user);
  };
  EliminarUsuarios(id:number)
  {
    return this.http.delete<Usuarios>(this.URL+'/usuarios/'+id)
  }
  //-------------- fin sector

  leerEquipos():Observable<Equipo[]>
  {
    return this.http.get<Equipo[]>(this.URL+'/equipos')
  };
  leerEquipoPorSector(id:number) : Observable<Equipo[]>
  {
    return this.http.get<Equipo[]>(this.URL+'/equipos/'+id)
  };
  GuardarEquipos(equipo:Equipo) : Observable<Equipo>
  {
    return this.http.post<Equipo>(this.URL+'/equipos', equipo)
  };
  ActualizarEquipos(equipo:Equipo, id:number)
  {
    return this.http.put<Equipo>(this.URL+'/equipos/'+id, equipo);
  };
  EliminarEquipos(id:number)
  {
    return this.http.delete<Equipo>(this.URL+'/equipos/'+id)
  }
  //------------------ fin equipos

  leerRemito():Observable<Remito[]>
  {
    return this.http.get<Remito[]>(this.URL+'/remito')
  };
  BuscarRemito(numero:number) : Observable<any>
  {
    return this.http.get(this.URL+'/remito/' +numero)
  };
  //---------------- fin remito

  guardarNuevaActa(nueva:NuevaActa):Observable<any>
  {
    return this.http.post(this.URL+'/NARemito',nueva)
  };
  //---------------- fin nuevaActa
  
   guardarNuevaActaNAM(nueva:NuevaActa):Observable<any>
   {
     return this.http.post(this.URL+'/NAMovimientos',nueva)
   };
   //---------------- fin nuevaActaNAM

   guardarNuevaActaNAE(nueva:NuevaActa):Observable<any>
   {
     return this.http.post(this.URL+'/NAEquipo',nueva)
   };
   //---------------- fin nuevaActaNAE

   buscarHistorial(id:string):Observable<Historial[]>
   {
     return this.http.get<Historial[]>(this.URL+'/historial/'+id)
   };
   buscarHistoActa(id:string):Observable<Historial[]>
   {
     return this.http.get<Historial[]>(this.URL+'/histoActa/'+id)
   }

   guardarCargaGranel(nueva:CargaGranel):Observable<any>
   {
     return this.http.post(this.URL+'/cargaGranel',nueva)
   };

   ActivarDesactivar(Activo : Valor){
    return this.http.put<Valor>(this.URL+'/ActivarDesactivarUsuario', Activo);
   };

   updatePass(Pass : Usuarios){
    return this.http.put<Usuarios>(this.URL+'/updatePass', Pass);
   };
}

