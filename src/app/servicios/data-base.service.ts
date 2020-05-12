import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { Articulos } from '../models/articulos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  formData : Usuarios  
  list : Usuarios[];
  articulo : Articulos[];
  rootURL:string = "http://localhost:49945/api"

  // url= {
  //        user:'DESKTOP-M4CABEP',
  //        password:'',
  //        server: 'DESKTOP-M4CABEP\SQLEXPRESS',
  //        database:'patrimonio',
  //    };
 // url='DESKTOP-M4CABEP\SQLEXPRESS';
  constructor(private http : HttpClient) { }

  postUsuarios(formData : Usuarios){
   return this.http.post(this.rootURL+'/Usuarios', formData);
  }

  refreshList(){
    this.http.get(this.rootURL+'/Articulos')
    .toPromise().then(res => this.articulo = res as Articulos[]);
  }



   leerArticulos():Observable<Articulos[]>{
      return this.http.get<Articulos[]>(this.rootURL+'/Articulos')
    }
}

