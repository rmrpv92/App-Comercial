import { Routes } from '@angular/router';
import { AppComercialComponent } from './pages/app-comercial/app-comercial';

export const routes: Routes = [
    {path: "", redirectTo: "app-comercial", pathMatch: "full"},
    {path: "app-comercial", component: AppComercialComponent}
];
