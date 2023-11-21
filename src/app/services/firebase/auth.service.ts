import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UsuarioActualService } from '../usuario-actual.service';



interface UserData {
  uid: string;
  email: string;
  esConductor: boolean;
  nombre: string;
  edad: number;
  // ... otras propiedades según tu estructura
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private usuarioActualService: UsuarioActualService
  ) { }

  async mensajeToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async mostrarMensajeError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login(email: string, pass: string, rememberMe: boolean) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, pass);
  
      if (userCredential.user) {
        if (rememberMe) {
          await this.auth.setPersistence('local');
        }
  
        // Obtener información adicional del usuario desde Firestore
        const userDoc = await this.firestore.collection('usuarios').doc<UserData>(userCredential.user.uid).get().toPromise();
  
        // Verificar si el documento existe antes de intentar acceder a "data"
        if (userDoc) {
          const userData = userDoc.data() as UserData;
  
          // Agregar el UID al objeto userData
          userData.uid = userCredential.user.uid;
  
          // Combina la información del usuario con la información adicional
          const userWithAdditionalData = { ...userCredential.user, ...userData };
  
          // Establecer el usuario actual en el servicio UsuarioActualService
          this.usuarioActualService.obtenerUsuario(userWithAdditionalData);
  
          this.router.navigate(['inicio']);
          console.log(userWithAdditionalData);
        } else {
          // Manejar el caso en que el documento no existe
          console.error('El documento del usuario no existe en Firestore');
          // Puedes mostrar un mensaje de error al usuario o tomar otras medidas según sea necesario
        }
      }
    } catch (error: any) {
      console.error('Error en login: ', error);
  
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        this.mostrarMensajeError('Correo o contraseña inválida');
      } else {
        this.mostrarMensajeError('Correo o contraseña inválida, si el error sigue contacte al soporte.');
      }
    }
  }
  

  async logup(email: any, pass: any, nombre: any, edad: any) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, pass);
      const user = userCredential.user;
  
      if (user) {
        const uid = user.uid; // Obtener el UID del usuario
  
        await this.firestore.collection('usuarios').doc(uid).set({
          email: user.email,
          esConductor: false,
          nombre: nombre,
          edad: edad
        });
  
        // Establecer el UID del usuario actual en el servicio UsuarioActualService
        this.usuarioActualService.setUid(uid);
  
        this.router.navigate(['login']);
  
        console.log(user);
      }
    } catch (error) {
      console.error('Error en register: ', error);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      // Limpiar el usuario actual en el servicio UsuarioActualService
      this.usuarioActualService.obtenerUsuario(null);
    } catch (error) {
      console.error('Error en el logout: ', error);
    }
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        // Establecer el usuario actual en el servicio UsuarioActualService
        this.usuarioActualService.obtenerUsuario(user);
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }

  async actualizarEsConductor(uid: string, esConductor: boolean) {
    try {
  
      // Verificar que el documento exista antes de intentar actualizarlo
      const userDoc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
  
      if (userDoc) {
        // El documento existe, actualizar el campo esConductor
        await this.firestore.collection('usuarios').doc(uid).update({ esConductor: esConductor });
        console.log('Campo esConductor actualizado correctamente.');
      } else {
        console.error('El documento del usuario no existe en Firestore');
      }
    } catch (error) {
      console.error('Error al actualizar el campo esConductor:', error);
      // Puedes manejar el error según tus necesidades
    }
  }
  
  
}
