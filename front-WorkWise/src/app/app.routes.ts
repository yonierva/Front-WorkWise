import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { personaLoginComponent } from './Persona/login/login.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { RegisterComponent } from './Persona/register/register.component';
import { PerfilComponent } from './Persona/perfil/perfil.component';
import { empresaLoginComponent } from './Empresa/login/login.component';
import { PostulacionesPendientesComponent } from './Persona/postulaciones-pendientes/postulaciones-pendientes.component';
import { EmpresaRegisterComponent } from './Empresa/empresa-register/empresa-register.component';
import { OfertasEmpresaComponent } from './Empresa/ofertas-empresa/ofertas-empresa.component';

export const routes: Routes = [
    // invitados
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'ofertasInicio',
        component: OfertasComponent
    },


    // persona
    {
        path: 'loginPersona',
        component: personaLoginComponent
    },

    {
        path: 'registerPersona',
        component: RegisterComponent
    },

    {
        path: 'perfilPersona',
        component: PerfilComponent
    },
    {
        path: 'postulacionesPendientes',
        component: PostulacionesPendientesComponent
    },

    // empresa
    {
        path: 'loginEmpresa',
        component: empresaLoginComponent
    },

    {
        path: 'RegisterEmpresa',
        component: EmpresaRegisterComponent
    },

    {
        path: 'ofertas-empresa',
        component: OfertasEmpresaComponent
    },

    // ⚠️ Ruta por defecto (404)
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }