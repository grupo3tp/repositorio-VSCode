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
    localStorage.setItem('Token' , JSON.stringify(token))
  }
  logintoken(token: any): Observable<any> {
     return this.http.post(this.URL+"/token",token)
  }
  borrarLocalStorage(){
    localStorage.removeItem("Token");
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

  leerTransporte():Observable<Transporte[]>
  {
      return this.http.get<Transporte[]>(this.URL+'/transporte')
  };
  //----------------fin trasporte

  leerUsuarios():Observable<Usuarios[]>
  {
    return this.http.get<[]>(this.URL+'/usuarios')
  };
  GuardarUsuarios(user:Usuarios) : Observable<Usuarios>
  {
    return this.http.post<Usuarios>(this.URL+'/usuarios', user)
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
     return this.http.get<Historial[]>(this.URL+'/historial/' +id)
   };
   buscarHistoActa(id:string):Observable<Historial[]>
   {
     return this.http.get<Historial[]>(this.URL+'/histoActa/'+id)
   }

}

