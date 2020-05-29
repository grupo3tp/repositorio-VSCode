import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulos } from '../models/articulos.model';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';
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
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken():boolean {
    return (this.cookies.check("token"));
  }
  logout() {
    this.cookies.delete('token');
  }

  leerArticulos():Observable<Articulos[]>
  {
      return this.http.get<Articulos[]>(this.URL+'/articulos')
  };
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
    return this.http.delete<any>(this.URL+'/marca/'+id)
  }
}

