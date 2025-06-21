import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonServices } from '../../pokemon-services';
import { AsyncPipe } from '@angular/common';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { PokemonDetails } from '../../types/type';

@Component({
  selector: 'app-pokemon-detail',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail {
  // injection de la dépendance PokemonService
  public pokemonService = inject(PokemonServices);

  pokemon$: Observable<PokemonDetails>;

  isLoading = true;

  // injection de ActivatedRoute via le constructor du composant
  constructor(private route: ActivatedRoute) {
    // utilisation de rxjs afin de rechercher les infos du pokemon en utilisant les paramètres du routeur
    this.pokemon$ = this.route.paramMap.pipe(
      // initiallement is loading est true
      tap(() => this.isLoading = true),
      // depuis l'observable des paramètre de route on récupère le nom du pokemon requis
      switchMap(params => {
        const name = params.get('name')!;
        // on retourne l'observable contenant les résultat de l'API afin de mettre à jour l'état de pokemon$
        return this.pokemonService.getPokemonDetails(name);
      }),

      // après réponse API, l'opérateur tap permet de déclencher un effet de bord (side effect) afin
      // d'attribuer la valeur false à isLoading
      tap(() => this.isLoading = false),

      // en cas d'erreur: display d'un log et retour d'un observable rxjs EMPTY car un observable
      // est attendu en sorti. isLoading est aussi mis a false ici puisqu'une erreur dans le pipe déclencherait
      // le catch sans passer par l'opérateur tap précédent.
      catchError((err) => {
        this.isLoading = false;
        console.error('Failed to load Pokémon:', err);
        return EMPTY;
      }),
    );
  }
}
