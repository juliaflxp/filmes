import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Filme } from '../interfaces/filme';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Filmes {

  private http = inject(HttpClient);
  url = 'http://www.omdbapi.com/';
  api_key = '5367c73a';

  obterFilme(titulo: string): Observable<Filme>{
    return this.http.get<Filme>(`${this.url}?t=${titulo}&apikey=${this.api_key}`)
  }
  
  obterListaFilmes(titulo: string): Observable<Filme[]>{
    return this.http.get<Filme[]>(`${this.url}?s=${titulo}&type=movie&apikey=${this.api_key}`)
  }
}
