import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { SolicitudViaje } from 'src/app/interfaces/isolicitudviajes';
import { Observable, filter, first, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  constructor(private firestore: AngularFirestore) {}

  enviarSolicitud(solicitud: SolicitudViaje): Promise<DocumentReference<SolicitudViaje>> {
    return this.firestore.collection<SolicitudViaje>('solicitudes').add({
      ...solicitud,
      usuariouId: solicitud.usuariouId,
    });
  }
  
  obtenerSolicitudesPendientes(conductorId: string): Observable<SolicitudViaje[]> {
    return this.firestore.collection<SolicitudViaje>('solicitudes', ref =>
      ref.where('conductorId', '==', conductorId).where('estado', '==', 'pendiente')
    ).valueChanges({ idField: 'id' });
  }

  obtenerSolicitudesAceptadasPorUser(usuariouId: string): Observable<SolicitudViaje[]> {
    return this.firestore.collection<SolicitudViaje>('solicitudes', ref =>
      ref.where('usuariouId', '==', usuariouId).where('estado', '==', 'aceptada')
    ).valueChanges({ idField: 'id' });
  }
  

  aceptarSolicitud(solicitudId: string): Promise<void> {
    console.log('Aceptando solicitud...', solicitudId);
    return this.firestore.collection<SolicitudViaje>('solicitudes').doc(solicitudId).update({ estado: 'aceptada' })
      .then(() => {
        console.log('Solicitud aceptada correctamente');
        
      })
      .catch(error => console.error('Error al aceptar la solicitud:', error));
  }
  
  rechazarSolicitud(solicitudId: string): Promise<void> {
    console.log('Rechazando solicitud...', solicitudId);
    return this.firestore.collection<SolicitudViaje>('solicitudes').doc(solicitudId).update({ estado: 'rechazada' })
      .then(() => {
        console.log('Solicitud rechazada correctamente');
      })
      .catch(error => console.error('Error al rechazar la solicitud:', error));
  }

  getSolicitudesPendientesConductor(conductorId: string): Observable<SolicitudViaje[]> {
    return this.firestore.collection<SolicitudViaje>('solicitudes', ref =>
      ref.where('conductorUid', '==', conductorId).where('estado', '==', 'pendiente')
    ).valueChanges({ idField: 'id' }).pipe(
      tap(solicitudes => console.log('Solicitudes obtenidas en el servicio:', solicitudes))
    );
  }

  // En solicitudes.service.ts

  obtenerNombreUsuario(usuarioId: string): Observable<string> {
    return this.firestore.collection('usuarios').doc(usuarioId).valueChanges()
      .pipe(
        map((usuario: any) => usuario.nombre) // Ajusta esto según la estructura de tu colección de usuarios
      );
  }

  obtenerSolicitud(solicitudId: string): Observable<SolicitudViaje | undefined> {
    return this.firestore.collection<SolicitudViaje>('solicitudes').doc(solicitudId).valueChanges({ idField: 'id' });
  }

  obtenerSolicitudPorViaje(viajeId: string, usuariouId: string, conductorUid: string): Observable<SolicitudViaje | undefined> {
    return this.firestore.collection<SolicitudViaje>('solicitudes', ref =>
      ref.where('viajeId', '==', viajeId)
         .where('usuariouId', '==', usuariouId)
         .where('conductorUid', '==', conductorUid)
         .limit(1)
    ).valueChanges({ idField: 'id' }).pipe(
      map(solicitudes => solicitudes[0] || undefined)
    );
  }

  obtenerSolicitudPorViajeConEstado(viajeId: string, usuariouId: string, conductorUid: string, estado: string): Observable<SolicitudViaje | undefined> {
    return this.obtenerSolicitudPorViaje(viajeId, usuariouId, conductorUid).pipe(
      filter(solicitud => solicitud?.estado === estado),
      first()
    );
  }

  enviarSolicitudConObservador(solicitud: SolicitudViaje): Observable<SolicitudViaje> {
    return new Observable<SolicitudViaje>(observer => {
      this.enviarSolicitud(solicitud)
        .then((solicitudDocRef) => {
          solicitudDocRef.get().then((solicitudDoc) => {
            const solicitudData = solicitudDoc.data();
            if (solicitudData) {
              observer.next(solicitudData);
            } else {
              observer.error(new Error('No se encontraron datos para la solicitud'));
            }
            observer.complete();
          });
        })
        .catch(error => observer.error(error));
    });
  }

}
