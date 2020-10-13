import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import { Sector } from 'src/app/models/sector';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-por-sector',
  templateUrl: './por-sector.component.html',
  styleUrls: ['./por-sector.component.scss']
})
export class PorSectorComponent implements OnInit {

  formxSector : FormGroup
  sector : Array<Sector> = new Array<Sector>();
  sectorQuery : Array<Sector> = new Array<Sector>();

  constructor(private fb:FormBuilder, private service : DataBaseService) { }

  ngOnInit(): void {

    this.service.leerSector().subscribe((item)=>{
      this.sector = item;
    })
    
    this.formxSector = this.fb.group({
      id_Sec: ['', Validators.required]
    })
  }

  agregar(formValue : any){
    let idSector = formValue.id_Sec;

    this.service.leerSectorxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      debugger
      this.generacionPdf();
    },error=>{
      console.log("exploto"+error);
    })
  }

  lSerie(){
    let idSector = this.sectores;

    this.service.leerSectorxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      debugger
      this.generacionPdf();
    },error=>{
      console.log("exploto"+error);
    })
  }

  lArticulos(){
    let idSector = this.sectores;

    this.service.leerSectorxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      debugger
      this.generacionPdf1();
    },error=>{
      console.log("exploto"+error);
    })
  }

  lTotales(){
    let idSector = this.sectores;

    this.service.leerSectorxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      debugger
      this.generacionPdf2();
    },error=>{
      console.log("exploto"+error);
    })
  }

  generacionPdf(){
    var doc = new jsPDF('p','mm','A4');
    
    doc.page=1;
    doc.setFontSize(15);
    doc.text(10,10,'Stock: '+this.sectorQuery[0].Sector)
    doc.setFontSize(5);
    doc.text(150,10,Date())
    doc.setFontSize(10);

    let vTipo=this.sectorQuery[0].Tipo;
    let vArticulo=this.sectorQuery[0].Articulo;
    let vLinea=20;
    let cantArt=0;
    let cantTipo=0;
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(10,vLinea,'Tipo: '+vTipo);
    vLinea=vLinea+10;
        
    for(let i=0;i<this.sectorQuery.length;i++){
      if(vLinea>280){
        vLinea=10;
        doc.addPage();
      }

      if (vTipo==this.sectorQuery[i].Tipo){

      
        if (vArticulo==this.sectorQuery[i].Articulo){
          doc.text(10,vLinea,this.sectorQuery[i].serial);
          doc.text(40,vLinea,this.sectorQuery[i].nInventario);
          doc.text(60,vLinea,this.sectorQuery[i].Articulo);
          cantArt=cantArt+1;
          cantTipo=cantTipo+1;
          vLinea=vLinea + 5;

        }
        else{
          doc.text(100,vLinea,'Total '+this.sectorQuery[i-1].Articulo+' : '+cantArt);
          vLinea=vLinea + 10;
          if(vLinea>280){
            vLinea=10;
            doc.addPage();
          }
          cantArt=0;
          doc.text(10,vLinea,this.sectorQuery[i].serial);
          doc.text(40,vLinea,this.sectorQuery[i].nInventario);
          doc.text(60,vLinea,this.sectorQuery[i].Articulo);
          vArticulo=this.sectorQuery[i].Articulo;
          cantArt=cantArt+1;
          cantTipo=cantTipo+1;
          vLinea=vLinea + 5;
        }

      }
      else
      {
        doc.text(100,vLinea,'Total '+this.sectorQuery[i-1].Articulo+' : '+cantArt);
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        cantArt=0;
        doc.text(100,vLinea,'Total '+this.sectorQuery[i-1].Tipo+' : '+cantTipo);
        cantTipo=0;
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        doc.text(10,vLinea,'____________________________________________________________________________________________');
        vLinea=vLinea+5;
        doc.text(10,vLinea,'Tipo: '+this.sectorQuery[i].Tipo);
        vTipo=this.sectorQuery[i].Tipo;
        vArticulo=this.sectorQuery[i].Articulo;
        vLinea=vLinea + 10;
        doc.text(10,vLinea,this.sectorQuery[i].serial);
        doc.text(40,vLinea,this.sectorQuery[i].nInventario);
        doc.text(60,vLinea,this.sectorQuery[i].Articulo);
        cantArt=cantArt+1;
        cantTipo=cantTipo+1
        vLinea=vLinea + 5;
      }

    }

    //Final listado
    let vTotal=this.sectorQuery.length;

    doc.text(100,vLinea,'Total '+this.sectorQuery[vTotal-1].Articulo+' : '+cantArt);
    vLinea=vLinea + 10;
    if(vLinea>280){
      vLinea=10;
      doc.addPage();
    }
    cantArt=0;
    doc.text(100,vLinea,'Total '+this.sectorQuery[vTotal-1].Tipo+' : '+cantTipo);
    cantTipo=0;
    vLinea=vLinea + 10;
    if(vLinea>280){
      vLinea=10;
      doc.addPage();
    }
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(100,vLinea,'Total : '+vTotal);

    

    const pageCount = doc.internal.getNumberOfPages();
    for(var j = 1; j <= pageCount; j++) 
    {
      // Go to page i
      doc.setPage(j);
      //Print Page 1 of 4 for example
      doc.text('Pagina ' + String(j) + ' de ' + String(pageCount),210-20,290,null,null,"right");
    }

    doc.save('lStockDetalle'+Date())

  }

  generacionPdf1(){
    var doc = new jsPDF('p','mm','A4');
    
    doc.page=1;
    doc.setFontSize(15);
    doc.text(10,10,'Stock: '+this.sectorQuery[0].Sector)
    doc.setFontSize(5);
    doc.text(150,10,Date())
    doc.setFontSize(10);

    let vTipo=this.sectorQuery[0].Tipo;
    let vArticulo=this.sectorQuery[0].Articulo;
    let vLinea=20;
    let cantArt=0;
    let cantTipo=0;
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(10,vLinea,'Tipo: '+vTipo);
    vLinea=vLinea+10;
        
    for(let i=0;i<this.sectorQuery.length;i++){
      if(vLinea>280){
        vLinea=10;
        doc.addPage();
      }

      if (vTipo==this.sectorQuery[i].Tipo){

      
        if (vArticulo==this.sectorQuery[i].Articulo){
          
          cantArt=cantArt+1;
          cantTipo=cantTipo+1;
          //vLinea=vLinea + 5;

        }
        else{
          doc.text(30,vLinea,this.sectorQuery[i-1].Articulo+' : '+cantArt);
          vLinea=vLinea + 5;
          if(vLinea>280){
            vLinea=10;
            doc.addPage();
          }
          cantArt=0;
          
          vArticulo=this.sectorQuery[i].Articulo;
          cantArt=cantArt+1;
          cantTipo=cantTipo+1;
          //vLinea=vLinea + 5;
        }

      }
      else
      {
        doc.text(30,vLinea,this.sectorQuery[i-1].Articulo+' : '+cantArt);
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        cantArt=0;
        doc.text(30,vLinea,'Total '+this.sectorQuery[i-1].Tipo+' : '+cantTipo);
        cantTipo=0;
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        doc.text(10,vLinea,'____________________________________________________________________________________________');
        vLinea=vLinea+5;
        doc.text(10,vLinea,'Tipo: '+this.sectorQuery[i].Tipo);
        vTipo=this.sectorQuery[i].Tipo;
        vArticulo=this.sectorQuery[i].Articulo;
        vLinea=vLinea + 10;
        
        cantArt=cantArt+1;
        cantTipo=cantTipo+1
        //vLinea=vLinea + 5;
      }

    }

    //Final listado
    let vTotal=this.sectorQuery.length;

    doc.text(30,vLinea,this.sectorQuery[vTotal-1].Articulo+' : '+cantArt);
    vLinea=vLinea + 10;
    if(vLinea>280){
      vLinea=10;
      doc.addPage();
    }
    cantArt=0;
    doc.text(30,vLinea,'Total '+this.sectorQuery[vTotal-1].Tipo+' : '+cantTipo);
    cantTipo=0;
    vLinea=vLinea + 10;
    if(vLinea>280){
      vLinea=10;
      doc.addPage();
    }
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(100,vLinea,'Total : '+vTotal);

    

    const pageCount = doc.internal.getNumberOfPages();
    for(var j = 1; j <= pageCount; j++) 
    {
      // Go to page i
      doc.setPage(j);
      //Print Page 1 of 4 for example
      doc.text('Pagina ' + String(j) + ' de ' + String(pageCount),210-20,290,null,null,"right");
    }

    doc.save('lStockArticulo'+Date())

  }

  generacionPdf2(){
    var doc = new jsPDF('p','mm','A4');
    
    doc.page=1;
    doc.setFontSize(15);
    doc.text(10,10,'Stock: '+this.sectorQuery[0].Sector)
    doc.setFontSize(5);
    doc.text(150,10,Date())
    doc.setFontSize(10);

    let vTipo=this.sectorQuery[0].Tipo;
    let vArticulo=this.sectorQuery[0].Articulo;
    let vLinea=20;
    let cantArt=0;
    let cantTipo=0;
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
            
    for(let i=0;i<this.sectorQuery.length;i++){
      if(vLinea>280){
        vLinea=10;
        doc.addPage();
      }

      if (vTipo==this.sectorQuery[i].Tipo){

      
        if (vArticulo==this.sectorQuery[i].Articulo){
          
          cantArt=cantArt+1;
          cantTipo=cantTipo+1;
          //vLinea=vLinea + 5;

        }
        else{
          
          if(vLinea>280){
            vLinea=10;
            doc.addPage();
          }
          cantArt=0;
          
          vArticulo=this.sectorQuery[i].Articulo;
          cantArt=cantArt+1;
          cantTipo=cantTipo+1;
          //vLinea=vLinea + 5;
        }

      }
      else
      {
        
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        cantArt=0;
        doc.text(30,vLinea,'Total '+this.sectorQuery[i-1].Tipo+' : '+cantTipo);
        cantTipo=0;
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        doc.text(10,vLinea,'____________________________________________________________________________________________');
        vLinea=vLinea+5;
        //doc.text(10,vLinea,'Tipo: '+this.sectorQuery[i].Tipo);
        vTipo=this.sectorQuery[i].Tipo;
        vArticulo=this.sectorQuery[i].Articulo;
        //vLinea=vLinea + 10;
        
        cantArt=cantArt+1;
        cantTipo=cantTipo+1
        //vLinea=vLinea + 5;
      }

    }

    //Final listado
    let vTotal=this.sectorQuery.length;

    
    if(vLinea>280){
      vLinea=10;
      doc.addPage();
    }
    cantArt=0;
    doc.text(30,vLinea,'Total '+this.sectorQuery[vTotal-1].Tipo+' : '+cantTipo);
    cantTipo=0;
    vLinea=vLinea + 10;
    if(vLinea>280){
      vLinea=10;
      doc.addPage();
    }
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(100,vLinea,'Total : '+vTotal);

    

    const pageCount = doc.internal.getNumberOfPages();
    for(var j = 1; j <= pageCount; j++) 
    {
      // Go to page i
      doc.setPage(j);
      //Print Page 1 of 4 for example
      doc.text('Pagina ' + String(j) + ' de ' + String(pageCount),210-20,290,null,null,"right");
    }

    doc.save('lStockTotal'+Date())

  }

  sectores: number;

  sectoresID(event){
    this.sectores = event
  }

}
