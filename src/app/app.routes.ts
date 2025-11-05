import { Routes } from '@angular/router';
import { BuscarFilme } from './components/buscar-filme/buscar-filme';
import { BuscarListaFilmes } from './components/buscar-lista-filmes/buscar-lista-filmes';

export const routes: Routes = [
    {
        path: 'buscarFilme',
        component: BuscarFilme,
    },
    {
        path: 'buscarListaFilmes',
        component: BuscarListaFilmes
    },
    {
        path: '',
        redirectTo: '/buscarFilme',
        pathMatch: 'full'
    }

];
