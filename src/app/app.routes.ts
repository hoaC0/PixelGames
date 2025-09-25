import { Routes } from '@angular/router';
import { Home } from './use-cases/home/home/home';

export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: Home },
    { path: "**", redirectTo: "/home" }
];
