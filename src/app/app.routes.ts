import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailPageComponent } from './detail-page/detail-page.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => HomeComponent,
        title: "JawirBooks"
    },
    {
        path: 'detail/:id',
        loadComponent: () => DetailPageComponent,
        title: "Dive Into Books",
    },
];
