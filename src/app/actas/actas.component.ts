import { Component, OnInit } from '@angular/core';
import { DataBaseService } from '../servicios/data-base.service';
import { Remito } from '../models/remito';
import Swal from 'sweetalert2';
//import { PdfMakeWrapper, Txt, Img, Columns, SVG, TextReference } from 'pdfmake-wrapper';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
import { PatternValidator } from '@angular/forms';





@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.scss']
})
export class ActasComponent implements OnInit {

  nRemito : number;
  remito : Array<Remito> = new Array<Remito>();
  fecha : Date;
  transporte : string;
  origen : string;
  destino : string;
  contacto : string;
  observaciones : string;
  nInventario: string;
  serial : number;
  detalles : string;
  numeroSerie : string
  nivel : number;
  
  constructor(private service : DataBaseService) { }

  ngOnInit(): void {
    this.idNivel();
  }

  idNivel(){
    this.nivel = JSON.parse(localStorage.getItem("idNivel"));
   }

  acta(numero){
   this.nRemito = numero
  }

  async buscar(){
    if(this.nRemito != null){
      let pattern = /^[0-9]/
      if (!pattern.test(this.nRemito.toString())) { 
          Swal.fire({
          title: 'no se permiten caracteres especiales, solo numeros',
          icon: 'info',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
          }) 
          .then((result) =>{
            if(result.value){
              location.reload();
            }
          })
      }else{
        this.service.BuscarRemito(this.nRemito).subscribe(data =>{
          this.remito = data
        },
        error => {
          Swal.fire({
            title: 'El acta Nº '+ this.nRemito +' no existe',
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
            })
            .then((result) =>{
              if(result.value){
                location.reload();
              }
            })
        })
      }
    }else{
      location.reload();
    }

   
   
      
     
    
    setTimeout(() => {
      this.transporte = this.remito[0].Transporta
      this.origen = this.remito[0].De
      this.destino = this.remito[0].Para
      this.contacto = this.remito[0].Contacto
      this.observaciones = this.remito[0].Observaciones
      this.fecha = this.remito[0].Fecha
    }, 500);  
  }

  pdfGenerator(){


    var versiones = ['ORIGINAL','DUPLICADO','DIV REGISTRACIONES','TRANSPORTE','FISCALIZACION']; 
    var doc=Array;
    for (var i=0;i<versiones.length;i++){
    
    //var ver:string=versiones[i];

    //console.log(ver+' '+versiones.length);    }

    doc[i] = new jsPDF('p','mm','A4');
    //var doc[i]2 = new jsPDF('p','mm','A4');
    doc[i].page=1;
    var contacto:string;
    var obvs:string;
    var items:number=this.remito.length; 
    var direccion:string="."
    var startY:number=55;
    var pagina = "Pagina: " + doc[i].page ;
    
    //doc[i].setFontSize(30);
    //doc[i].text(80,10,ver)
    
    //doc[i].text(pagina, 50, doc[i].internal.pageSize.height );
    var cuerpo = [];
    var imgData = "../../assets/logo13.png"
    var imgData1 = "../../assets/blanco.png"
    //Cabecera
    
    //for (var i=0;i<versiones.length;i++){
    
    doc[i].setFontSize(15);
    doc[i].text(170,10,'Acta n°: '+ this.nRemito);

    doc[i].setFontSize(10);
    var dia:string=(this.remito[0].Fecha.toString().substring(8,10)+this.remito[0].Fecha.toString().substring(4,8)+this.remito[0].Fecha.toString().substring(0,4));
    doc[i].text(10,10, 'Fecha: '+ dia);
    //doc[i].text(10,10, 'Fecha: '+ this.remito[0].Fecha.toString().substring(0,10));
    doc[i].text(10,20,'De: '+ this.remito[0].De);
    doc[i].text(10,27,'Para: '+ this.remito[0].Para);
    direccion = "Direccion: "+ this.remito[0].Direccion + "    Localidad: "+ this.remito[0].Localidad + "."+ this.remito[0].Provincia;
    doc[i].text(10,32,direccion);
    
    if(this.remito[0].Contacto==null){this.contacto=' . ' ;}
    else{this.contacto=this.remito[0].Contacto;}
    doc[i].text(10,40,'Contacto: '+ this.contacto);
    
    if(this.remito[0].Observaciones==null){obvs=' . ' ;}
    else{obvs=this.remito[0].Observaciones;}
    //observaciones
    doc[i].text(10,50,'Observaciones: ' + obvs.toString().substring(0,80));
    if(obvs.length> 80){doc[i].text(36,55, obvs.toString().substring(80,160));
    startY=startY+5;
    if(obvs.length>160){doc[i].text(36,60,obvs.toString().substring(160,240));
    startY=startY+5;}
    }
    
        
    doc[i].addImage(imgData, 'png',140 , 15, 50, 30);
    
      
    
    var col = ["cant.","serial", "n° Inventario","detalle","marca"]//, "fecha", "transporte", "origen", "destino", "contacto","observaciones"] 
    this.remito.forEach(element =>{
      var temp = [element.Cantidad, element.nSerie,element.nInventario, element.Detalle, element.Marcas]//, element.Fecha.toString().substring(0,10), element.Transporta, element.De, 
      //element.Para, element.Contacto, element.Observaciones]
      cuerpo.push(temp)
    })
    doc[i].autoTable(col,cuerpo,{startY})
    let finalY = doc[i].previousAutoTable.finalY+20; //this gives you the value of the end-y-axis-position of the previous autotable.
        
    if(finalY>210){
      doc[i].addPage();
      finalY=20;
        
    }
    
    doc[i].text('Total equipos: '+ items,10,finalY)
    doc[i].text('_______________________________', 130, finalY + 10);
    doc[i].text('Firma', 130, finalY + 15);
    doc[i].text('_______________________________', 130, finalY + 30);
    doc[i].text('Aclaración', 130, finalY + 35);
    doc[i].text('_______________________________', 130, finalY + 50);
    doc[i].text('DNI', 130, finalY + 55);
    doc[i].text('_______________________________', 130, finalY + 70);
    doc[i].text('Cargo', 130, finalY + 75);
    doc[i].text('_______________________________', 10, finalY + 50);
    doc[i].text('Entrego', 30, finalY + 55);
    

    
    //doc[i].addImage(imgData, 'png',125 , finalY + 20, 50, 30)
    const pageCount = doc[i].internal.getNumberOfPages();

    // For each page, print the page number and the total pages
    for(var j = 1; j <= pageCount; j++) 
    {
      // Go to page i
      doc[i].setPage(j);
      //Print Page 1 of 4 for example
      doc[i].text('Pagina ' + String(j) + ' de ' + String(pageCount),210-20,290,null,null,"right");
    }
    
    var ver:string;
    //for (var i=0;i<versiones.length;i++){
      ver='';
      ver=versiones[i];
      //console.log(ver+' '+versiones.length);
      
      doc[i].setFontSize(25);
      doc[i].text(ver,60,10); 
      
      doc[i].save('acta Nº '+this.nRemito+' '+ver);
      //doc[i].clean();
      
    }
  }

}