import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataBaseService } from '../servicios/data-base.service';
import { Usuarios } from '../models/usuarios';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos: boolean = true;
  textoError:string="";
  usuario:Array<Usuarios>=new Array<Usuarios>();
  constructor(private creadorFormulario: FormBuilder, private spinner: NgxSpinnerService, public variableInyectada: DataBaseService) { }

  ngOnInit(): void {

    this.variableInyectada.refreshList(); 
  

    this.formularioLogin=this.creadorFormulario.group({
      dni: ['',Validators.required],
      password: ['',Validators.required]
    });

    //  this.variableInyectada.leer().subscribe((desdeApi)=>{
    //    this.usuario = desdeApi;
    //    console.log(desdeApi)
    //  })

    this.resetForm();

  }

  resetForm(form? : NgForm){
    if (form!= null)
      form.resetForm();
      this.variableInyectada.formData = {
        Nombre_Usuario : "",
        Usuario : "",
        Id_Usuario: null,
        Pass: "",
        Nivel_Seguridad:null
      }
  }

  onSubmit(form : NgForm){
    this.insertRecord(form);
  }
  insertRecord(form : NgForm){
    this.variableInyectada.postUsuarios(form.value).subscribe(res => {
      this.resetForm(form);
    })
  }

  ingresar(){
    if(this.formularioLogin.valid)
    {
      this.datosCorrectos=true;
      this.spinner.show();
        // this.afAuth.auth.signInWithEmailAndPassword(this.formularioLogin.value.email,this.formularioLogin.value.password).
        //   then((usuario)=>{console.log(usuario) 
        //   this.spinner.hide()
        // }).catch((error)=>{
        //   this.datosCorrectos=false;
        //   this.textoError = error.message
        //   this.spinner.hide();
        // })
    }
    else
    {
      this.datosCorrectos=false;
      this.textoError = 'por favor, revise que los datos sean correctos'
    }

    
    
  }

}
