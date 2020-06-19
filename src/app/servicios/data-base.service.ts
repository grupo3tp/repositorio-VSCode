import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulos } from '../models/articulos.model';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';
import {Transporte} from '../models/transporte';
import {Sector} from '../models/sector';
import {Usuarios} from '../models/usuarios'
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
 
  URL:string = "http://localhost:3300/api"
  

  constructor(private http : HttpClient, private cookies: CookieService) { }

  login(user: any): Observable<any> {
    console.log(user)
    return this.http.post(this.URL+"/autentificacion", user);
  }
  logintoken(token: any): Observable<any> {
    return this.http.post(this.URL+"/authtoken",token)
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
  };
  //----------------fin articulos

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
  //----------------fin articulos

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

}

