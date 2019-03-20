import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from '../../services/carga-imagenes.service';
import { FileItem } from '../../models/file-items';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  sobreElemento = false;
  archivos: FileItem[] = [];


  constructor( public cargar: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this.cargar.cargarImagenesFirebase(this.archivos);
  }

  limpiarImagenes() {
    this.archivos = [];
  }

  pruebaSobreElemento(evento) {
    console.log(evento);
  }

}
