import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Articulos } from '../models/articulos.model';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
 
  URL:string = "http://localhost:3300/api"
  

  constructor(private http : HttpClient) { }

  leerArticulos():Observable<Articulos[]>{
      return this.http.get<Articulos[]>(this.URL+'/articulos')
  }

  leerMarca():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.URL+'/marca')
  }
}

