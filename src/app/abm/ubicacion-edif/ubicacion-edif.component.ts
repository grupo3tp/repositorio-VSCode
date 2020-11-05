import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S_IFREG } from 'constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Provincias } from 'src/app/models/provincias';
import { UbicacionEdif } from 'src/app/models/ubicacion-edif';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion-edif',
  templateUrl: './ubicacion-edif.component.html',
  styleUrls: ['./ubicacion-edif.component.scss']
})
export class UbicacionEdifComponent implements OnInit {

  formEdificios : FormGroup;
  edificios : Array<UbicacionEdif> = new Array<UbicacionEdif>();
  provincias : Array<Provincias> = new Array<Provincias>();
  esModificar :  boolean;
  lugarUbicacion : string;
  dir : string
  loc : string
  cp : string
  controlaStock : number
  boolStock : boolean

  constructor(private fb:FormBuilder, private service : DataBaseService,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formEdificios = this.fb.group({
      ubicacion : ['', Validators.required],
      stock : [''],
      direccion : ['', Validators.required],
      localidad : ['', Validators.required],
      provincia : ['', Validators.required],
      codPostal :  [''],
   })
   this.leerEdificios();
  }
  leerEdificios(){
    this.service.leerUbicacionEdif().subscribe((item)=>{
      this.edificios = item;
     // console.log(this.edificios)
      this.leerProvincias();
    })
  }

  leerProvincias(){
    this.service.leerProvincias().subscribe((item)=>{
      this.provincias = item;
    })
  }

  modificar(){
    this.esModificar = !this.esModificar; 
  }

  agregar(formValue : any){
    const carga = new UbicacionEdif;
    carga.Ubicacion = formValue.ubicacion;
    carga.ControlaStock = formValue.stock;
    carga.Direccion = formValue.direccion;
    carga.Localidad = formValue.localidad;
    carga.id_Prov = formValue.provincia;
    carga.CodigoPostal = formValue.codPostal;
    
    if (carga.ControlaStock) {
      carga.ControlaStock = 1;
    } else {
      carga.ControlaStock = 0;
    }

    //console.log(carga)
    this.spinner.hide()
    Swal.fire({
      title: 'Edificio guardado',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    }) .then((result) =>{
     if(result.value){
    this.service.GuardarUbicacionEdif(carga).subscribe((item)=>{
      location.reload();
      this.formEdificios.reset();
    }, error =>{
      this.spinner.hide()
              Swal.fire({
                title: 'Error',
                text: error.name,
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
              })
            })
            }
          })

  }
  ubicacion(event){
    this.lugarUbicacion = event;
    this.edificios.forEach(element => {
      if(element.Ubicacion == this.lugarUbicacion){
        this.cp = element.CodigoPostal;
        this.dir = element.Direccion;
        this.loc = element.Localidad;
        this.controlaStock = element.ControlaStock
        console.log(this.controlaStock);
        
        if (element.ControlaStock == 1) {
          this.boolStock =  true
        } else { 
          this.boolStock = false
        }
      }
    });
  }


}
