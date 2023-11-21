import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;
  private solicitudEnviada = false;
  private solicitudPendiente = false;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  obtenerUsuario(user: any) {
    this.currentUserSubject.next(user || null);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  obtenerUsuarioObservable(): Observable<any> {
    return this.currentUser$;
  }

  setUid(uid: string) {
    // Agrega el UID al usuario actual
    const currentUser = this.currentUserSubject.value;
    const updatedUser = { ...currentUser, uid: uid };
    this.currentUserSubject.next(updatedUser);
  }

  // Métodos para obtener y establecer el estado de la solicitud
  getSolicitudEnviada(): boolean {
    return this.solicitudEnviada;
  }

  setSolicitudEnviada(value: boolean): void {
    this.solicitudEnviada = value;
  }

  getSolicitudPendiente(): boolean {
    return this.solicitudPendiente;
  }

  setSolicitudPendiente(value: boolean): void {
    this.solicitudPendiente = value;
  }
}
