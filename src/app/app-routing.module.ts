import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cargando',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cargando',
    loadChildren: () => import('./pages/cargando/cargando.module').then( m => m.CargandoPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./pages/mensajes/mensajes.module').then( m => m.MensajesPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'viajes',
    children: [
      {
        path: "",
        loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule)
      },
      {
        path: ':id', // Cambia 'id' por ':id'
        loadChildren: () => import('./pages/viajes/detalleviaje/detalleviaje.module').then( m => m.DetalleviajePageModule)
      },
    ]
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'register-conductor',
    loadChildren: () => import('./pages/register-conductor/register-conductor.module').then( m => m.RegisterConductorPageModule)
  },
  {
    path: 'iniciocondutores',
    loadChildren: () => import('./pages/iniciocondutores/iniciocondutores.module').then( m => m.IniciocondutoresPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'formulariocreardirecciones',
    loadChildren: () => import('./pages/formulariocreardirecciones/formulariocreardirecciones.module').then( m => m.FormulariocreardireccionesPageModule)
  },
  {
    path: 'direcciones-guardadas',
    children: [
      {
        path: "",
        loadChildren: () => import('./pages/direcciones-guardadas/direcciones-guardadas.module').then( m => m.DireccionesGuardadasPageModule)
      },
      {
        path: ':id', // 
        loadChildren: () => import('./pages/direcciones-guardadas/direccion/direccion.module').then( m => m.DireccionPageModule)
      },
    ]
  },
  {
    path: 'formulariocrearviaje',
    loadChildren: () => import('./pages/formulariocrearviaje/formulariocrearviaje.module').then( m => m.FormulariocrearviajePageModule)
  },
  {
    path: 'detalleapi/:id',
    loadChildren: () => import('./pages/detalleapi/detalleapi.module').then( m => m.DetalleapiPageModule)
  },
  {
    path: 'apihome',
    loadChildren: () => import('./pages/api/home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'apiadd',
    loadChildren: () => import('./pages/api/add/add.module').then( m => m.AddPageModule)
  },
  // {
  //   path: 'apiupdate/:id',
  //   loadChildren: () => import('./pages/api/update/update.module').then( m => m.UpdatePageModule)
  // },
  {
    path: 'apidatail/:id',
    loadChildren: () => import('./pages/api/datail/datail.module').then( m => m.DatailPageModule)
  },
  {
    path: 'terminoscondiciones',
    loadChildren: () => import('./pages/terminoscondiciones/terminoscondiciones.module').then( m => m.TerminoscondicionesPageModule)
  },
  {
    path: 'viajetomado',
    loadChildren: () => import('./pages/viajetomado/viajetomado.module').then( m => m.ViajetomadoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'updateviaje/:id',
    loadChildren: () =>
      import('./pages/updateviaje/updateviaje.module').then(
        (m) => m.UpdateviajePageModule
      ),
  },
  {
    path: 'tussolicitudes',
    loadChildren: () => import('./pages/tussolicitudes/tussolicitudes.module').then( m => m.TussolicitudesPageModule)
  },  {
    path: 'musicalista',
    loadChildren: () => import('./pages/musicalista/musicalista.module').then( m => m.MusicalistaPageModule)
  },











  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
