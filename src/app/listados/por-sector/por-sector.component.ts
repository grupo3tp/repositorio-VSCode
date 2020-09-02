import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-por-sector',
  templateUrl: './por-sector.component.html',
  styleUrls: ['./por-sector.component.scss']
})
export class PorSectorComponent implements OnInit {

  formxSector : FormGroup

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formxSector = this.fb.group({
      detalle: ['', Validators.required]
    })
  }

  agregar(formValue : any){
    formValue.detalle

  }

}
