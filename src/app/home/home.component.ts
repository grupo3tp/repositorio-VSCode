import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  number : string
  @Output('dato') dato = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // numero(event){
  //   this.number = event
  // }

  buscar(){
    
    //this.dato.emit(this.number)
    location.replace("/historial")
  }

}
