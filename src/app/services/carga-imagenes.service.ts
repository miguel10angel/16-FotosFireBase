import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items';


@Injectable({
  providedIn: 'root'
})

export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore) {  }

  private guardarImagen(imagen: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).
        add( imagen );
  }

  cargarImagenesFirebase( imagenes: FileItem[]) {
    const storageref = firebase.storage().ref();

    for ( const item of imagenes) {
        item.subiendo = true;
        if ( item.progreso >= 100 ) {
            continue;
        }

        const uploadTask: firebase.storage.UploadTask =
            storageref.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                .put(item.archivo);

                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                  (snapshot: firebase.storage.UploadTaskSnapshot) =>
                  item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                  (error) => console.error('Error al subir', error),
                  () => {
                    console.log('Imagen cargada');
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    item.url = downloadURL;
                    item.subiendo = false;
                    this.guardarImagen({
                      nombre: item.nombreArchivo,
                      url: item.url
                    });
                  });
                });

    }
  }
}
