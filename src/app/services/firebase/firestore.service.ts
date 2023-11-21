import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IViajes } from 'src/app/interfaces/iviajes';
import { EMPTY, Observable } from 'rxjs';
import { UsuarioActualService } from '../usuario-actual.service';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: AngularFirestore,
              private usuarioActualService: UsuarioActualService) { }

  getCollection(nombreColeccion: string){
    return this.firestore.collection<IViajes>(nombreColeccion).valueChanges( {idField: 'id'} );
  }

  createDocument(nombreColeccion: string, data: IViajes, conductorUid: string) {
    // Agregar el UID del conductor al objeto de datos del viaje
    data.conductorUid = conductorUid;

    const nombreConductor = this.usuarioActualService.getCurrentUser().nombre;
    data.conductor = nombreConductor;
    // Almacenar el viaje en la colección
    return this.firestore.collection<IViajes>(nombreColeccion).add(data);
  }

  updateDocument(nombreColeccion: string, documentId: string ,data: IViajes){
    return this.firestore.collection<IViajes>(nombreColeccion).doc(documentId).update(data);
  }

  deleteDocument(nombreColeccion: string, documentId: string){
    return this.firestore.collection<IViajes>(nombreColeccion).doc(documentId).delete();
  }

  getViajeById(nombreColeccion: string,documentId: string){
    return this.firestore.collection<IViajes>(nombreColeccion).doc(documentId).valueChanges();
  }

  getCollectionWithFilterForConductor(
    nombreColeccion: string,
    campo: string,
    operador: '==' | '<' | '<=' | '>' | '>=',
    valor: any,
    conductorUid: string
  ): Observable<IViajes[]> {
    if (valor !== undefined && conductorUid) {
      const collection = this.firestore.collection<IViajes>(nombreColeccion, ref =>
        ref.where(campo, operador, valor).where('conductorUid', '==', conductorUid)
      );
      console.log('Query:', collection);
      return collection.valueChanges({ idField: 'id' });
    } else {
      console.error('El valor del filtro o el UID del conductor es undefined');
      return EMPTY;
    }
  }
}
