import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/servicios/data-base.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable'
import { UbicacionEdif } from 'src/app/models/ubicacion-edif';
import Swal from 'sweetalert2';
import { Articulos } from 'src/app/models/articulos.model';

@Component({
  selector: 'app-por-ubicacion',
  templateUrl: './por-ubicacion.component.html',
  styleUrls: ['./por-ubicacion.component.scss']
})
export class PorUbicacionComponent implements OnInit {

  formxUbicacion : FormGroup
  edificios : Array<UbicacionEdif> = new Array<UbicacionEdif>();
  sectorQuery : Array<UbicacionEdif> = new Array<UbicacionEdif>();

  constructor(private fb:FormBuilder, private service : DataBaseService) { }

  ngOnInit(): void {

    this.service.leerUbicacionEdif().subscribe((item)=>{
      this.edificios = item;
    })
    
    this.formxUbicacion = this.fb.group({
      edif: ['', Validators.required]
    })
  }

  lSerie(){
    let idEdif = this.sectores;

    this.service.leerEdificioxId(idEdif).subscribe((item)=>{
      this.sectorQuery = item;
      //console.log(this.sectorQuery)
      this.generacionPdf();
    },error=>{
      Swal.fire({
        title: 'no registra movimientos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

  lArticulos(){
    let idSector = this.sectores;

    this.service.leerEdificioxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      
      this.generacionPdf1();
    },error=>{
      Swal.fire({
        title: 'no registra movimientos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }

  lTotales(){
    let idSector = this.sectores;

    this.service.leerEdificioxId(idSector).subscribe((item)=>{
      this.sectorQuery = item;
      //console.log(this.sectorQuery)
      this.generacionPdf2();
    },error=>{
      Swal.fire({
        title: 'no registra movimientos',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    })
  }
//******************************************************************************************* */
  generacionPdf(){
    var doc = new jsPDF('p','mm','A4');
    
    doc.page=1;
    doc.setFontSize(15);
    doc.text(10,10,'Stock: '+this.sectorQuery[0].Ubicacion)
    doc.setFontSize(5);
    doc.text(150,10,Date())
    doc.setFontSize(15);
    doc.text(10,20,'Sector: '+this.sectorQuery[0].Sector)
    doc.setFontSize(10);

    let vSector=this.sectorQuery[0].Sector
    let vTipo=this.sectorQuery[0].Tipo;
    let vArticulo=this.sectorQuery[0].Articulo;
    let vLinea=25;
    let cantArt=0;
    let cantTipo=0;
    let cantSector=0;
    
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(10,vLinea,'Tipo: '+vTipo);
    vLinea=vLinea+10;
        
    for(let i=0;i<this.sectorQuery.length;i++){
      if(vLinea>280){
        vLinea=10;
        doc.addPage();
      }
      if (vSector==this.sectorQuery[i].Sector){
                  

        if (vTipo==this.sectorQuery[i].Tipo){

        
          if (vArticulo==this.sectorQuery[i].Articulo){
            doc.text(10,vLinea,this.sectorQuery[i].serial);
            doc.text(40,vLinea,this.sectorQuery[i].nInventario);
            doc.text(60,vLinea,this.sectorQuery[i].Articulo);
            cantArt=cantArt+1;
            cantTipo=cantTipo+1;
            cantSector=cantSector+1;
            vLinea=vLinea + 5;

          }
          else{ //cierre articulo
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
            cantSector=cantSector+1;
            vLinea=vLinea + 5;
          }

        }
        else //cierre tipo
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
          cantSector=cantSector+1;
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
      else{ //cierre sector

        doc.text(100,vLinea,'Total '+this.sectorQuery[i-1].Articulo+' : '+cantArt);
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        cantArt=0;
        doc.text(100,vLinea,'Total '+this.sectorQuery[i-1].Tipo+' : '+cantTipo);
        cantTipo=0;
        //cantSector=cantSector+1;
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }
        doc.text(10,vLinea,'____________________________________________________________________________________________');
        vLinea=vLinea+5;
        doc.text(100,vLinea,'Total '+this.sectorQuery[i-1].Sector+' : '+cantSector);
        cantSector=0;
        vLinea=vLinea + 10;
        if(vLinea>280){
          vLinea=10;
          doc.addPage();
        }

        //doc.text(10,vLinea,'____________________________________________________________________________________________');
        doc.setFontSize(15);
        doc.text(10,vLinea,'Sector: '+this.sectorQuery[i].Sector);
        vSector=this.sectorQuery[i].Sector;
        doc.setFontSize(10);

        vLinea=vLinea+5;
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
        cantSector=cantSector+1;
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
    doc.text(100,vLinea,'Total '+this.sectorQuery[vTotal-1].Sector+' : '+cantSector);
    doc.text(10,vLinea,'____________________________________________________________________________________________');
    vLinea=vLinea+5;
    doc.text(100,vLinea,'Total : '+this.sectorQuery[0].Ubicacion+' : '+vTotal);

    

    const pageCount = doc.internal.getNumberOfPages();
    for(var j = 1; j <= pageCount; j++) 
    {
      // Go to page i
      doc.setPage(j);
      //Print Page 1 of 4 for example
      doc.text('Pagina ' + String(j) + ' de ' + String(pageCount),210-20,290,null,null,"right");
    }

    doc.save('lStockEdifDetalle'+Date())
  }

//******************************************************************************************* */
  
    

    generacionPdf1(){
      this.sectorQuery.sort((a, b) => a.id_Art - b.id_Art);
      //console.log(this.sectorQuery);


      var doc = new jsPDF('p','mm','A4');
      
      doc.page=1;
      doc.setFontSize(15);
      doc.text(10,10,'Stock: '+this.sectorQuery[0].Ubicacion)
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
  
  
//******************************************************************************************* */
generacionPdf2(){

  this.sectorQuery.sort((a, b) => a.id_Segmento - b.id_Segmento); 
  //console.log(this.sectorQuery);

  var doc = new jsPDF('p','mm','A4');
  
  doc.page=1;
  doc.setFontSize(15);
  doc.text(10,10,'Stock: '+this.sectorQuery[0].Ubicacion)
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
//******************************************************************************************* */
  sectores: number;

  edifID(event){
    this.sectores = event
  }

}
