import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Persona/login/login.component';
import { OfertasComponent } from './invitados/ofertas/ofertas.component';

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
        path: 'login',
        component: LoginComponent
    }



];
