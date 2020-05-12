import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }

  agregar(){
    console.log("pedir confirmacion")
  }

}
