import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
  fecha:Date = new Date();
  formularioEquipos:FormGroup;


  constructor(private fb:FormBuilder) {
  
   }

  ngOnInit(): void {
  }

}
