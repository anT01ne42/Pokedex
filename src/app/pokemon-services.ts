import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { PokemonList } from './components/pokemon-list/pokemon-list';
import {PokemonDetails, PokemonSummary, ResponseList} from './types/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonServices {
  private ApiUrlList = 'https://pokeapi.co/api/v2/pokemon?limit=50';
  private ApiUrlDetails = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<PokemonSummary[]> {
     return this.http.get<ResponseList>(this.ApiUrlList).pipe(
       map(response => response.results)
     )
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.ApiUrlDetails}${name}`);
  }
}
