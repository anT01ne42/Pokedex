import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { PokemonList } from './components/pokemon-list/pokemon-list';
import { PokemonDetails, PokemonSummary, PokemonSummaryWithDetails, ResponsePokemonList, ResponsePokemonTypeList, TypeInfo } from './types/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonServices {
  private ApiUrlList = 'https://pokeapi.co/api/v2/pokemon?limit=50';
  private ApiUrlDetails = 'https://pokeapi.co/api/v2/pokemon/';
  private ApiUrlTypes = 'https://pokeapi.co/api/v2/type/';
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<PokemonSummary[]> {
    return this.http.get<ResponsePokemonList>(this.ApiUrlList).pipe(
      map(response => response.results)
    )
  }

  getPokemonsSummaryWithTypes(): Observable<PokemonSummaryWithDetails[]> {
    // récupération de la liste des 50 pokemons avec infos basiques name et url
    return this.http.get<ResponsePokemonList>(this.ApiUrlList).pipe(
      // on se base sur la réponse initiale pour ensuite appeler les routes pour chaque pokemon
      // afin de récupéré les types des pokemons
      switchMap((response) => {
        const detailRequests = response.results.map((pokemon: PokemonSummary) =>
          // pour le pokemon sur lequel on itère on utilise l'url donnée par dans la réponse initiale qui permet d'avoir le detail du pokemon
          this.http.get<PokemonDetails>(pokemon.url).pipe(
            // depuis ce détail on récupère les deux infos qui nous intéressent pour la liste ainsi que le filtrage sur les éléments des pokemons
            map((pokemonDetails: PokemonDetails) => ({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              types: pokemonDetails.types,
              defaultSprite: pokemonDetails.sprites.front_default
            }))
          )
        );
        // retourne le résultat une fois que toutes les opérations du switchmap ont bien eu lieu et les infos ont été récupérées
        return forkJoin(detailRequests);
      })
    );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.ApiUrlDetails}${name}`);
  }

  getAllPokemonTypes(): Observable<TypeInfo[]> {
    return this.http.get<ResponsePokemonTypeList>(this.ApiUrlTypes).pipe(
      map(response => {
        return response.results
      })
    )
  }
}
