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
  serial : number;
  detalles : string;
  numeroSerie : string
  
  
  constructor(private service : DataBaseService) { }

  ngOnInit(): void {

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
  
    var doc = new jsPDF('l','mm','A4');
    var cuerpo = [];
    var imgData = "../../assets/logo13.png"
  
    
    var col = ["serial", "detalle", "fecha", "transporte", "origen", "destino", "contacto","observaciones"] 
    this.remito.forEach(element =>{
      var temp = [element.nSerie, element.Detalle, element.Fecha.toString().substring(0,10), element.Transporta, element.De, 
      element.Para, element.Contacto, element.Observaciones]
      cuerpo.push(temp)
    })
    doc.autoTable(col,cuerpo)
    let finalY = doc.previousAutoTable.finalY; //this gives you the value of the end-y-axis-position of the previous autotable.
    doc.text('Acta Nº: '+this.nRemito, 15, finalY + 10);
    doc.addImage(imgData, 'png',125 , finalY + 20, 50, 30)
    
    
  
    doc.save('acta Nº '+this.nRemito);
  }
        //esto es lo que estaba para que quede mas lindo pero no continua en una hoja nueva
        // var cuerpo = [];
        // var imgData = "../../assets/logo13.png"
        // var width = doc.internal.pageSize.getWidth();
        // var height = doc.internal.pageSize.getHeight();   
        // var col = ["serial", "detalle"] 
        // this.remito.forEach(element =>{
        //   var temp = [element.nSerie, element.Detalle]
        //   cuerpo.push(temp)
        // })
        // doc.autoTable(col,cuerpo)
        // let finalY = doc.previousAutoTable.finalY;
        // doc.setFontSize(12).text('Acta Nº: '+this.nRemito, 15, finalY + 10);
        // doc.text('Fecha: '+this.fecha.toString().substring(0,10), 100, finalY + 10);
        // doc.text('Transporte: '+this.transporte, 200, finalY + 10);
        // doc.text('Origen: '+this.origen, 15, finalY + 20);
        // doc.text('Destino: '+this.destino, 15, finalY + 30);
        // doc.text('Contacto: '+this.contacto, 15, finalY + 40);
        // doc.text('Observacion: '+this.observaciones , 15, finalY + 50, {maxWidth: 260, align: "justify"});
        // doc.addPage()

        // doc.addImage(imgData, 'png',120 , finalY + 60, 50, 30)
 
        //esto es para el que me paso luis que borre los npm
  // async pdf(){

  //   let fecha = this.fecha.toString().substring(0,10)
  //   const pdf = new PdfMakeWrapper();
  //   pdf.pageSize('A4');
  //   pdf.pageMargins([ 60, 60]);

  //   pdf.background(new Txt('TC ordenado').alignment("center").end)
       
  //   pdf.add(await new Img('assets/logo13.png').alignment("center").height(80).width(135).build())

  //   pdf.add([
  //     new Txt('Acta Nº '+ this.nRemito  ).bold().italics().fontSize(20).end, 
  //     new SVG('<svg width="20" height="15" viewBox="0 0 20 15">...</svg>').end,
  //     new Columns([ 'Fecha: '+fecha+ '', 'Transporte: '+this.transporte+'' ]).columnGap(10).end,
  //     new SVG('<svg width="20" height="15" viewBox="0 0 20 15">...</svg>').end,
  //     new Txt('Origen: '+this.origen).end,
  //     new SVG('<svg width="20" height="15" viewBox="0 0 20 15">...</svg>').end,
  //     new Txt('Destino: '+this.destino).end,
  //     new SVG('<svg width="20" height="15" viewBox="0 0 20 15">...</svg>').end,
  //     new Txt('Contacto: '+this.contacto).end,
  //     new SVG('<svg width="20" height="15" viewBox="0 0 20 15">...</svg>').end,
  //     new Txt('Observaciones: '+this.observaciones).end,
  //     new SVG('<svg width="20" height="15" viewBox="0 0 20 15">...</svg>').end,
  //   ])
  //   // this.remito.forEach(element => {
  //   //   new Columns([ 'Serial: '+element.nSerie+ '', 'Detalle: '+element.Detalle ]).columnGap(10).end
  //   // }),
      
  //   pdf.add([
      
  //   ])
   
    

    
  
  //  // pdf.add(new Columns([ 'Hello', 'world' ]).columnGap(10).end)
  //   pdf.footer("pie de pag")
  //   pdf.create().open()
  // }
}


