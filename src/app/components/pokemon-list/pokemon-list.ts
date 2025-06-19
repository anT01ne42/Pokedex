import { Component, inject } from '@angular/core';
import { PokemonServices } from '../../pokemon-services';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { sortPokemons } from '../../utils/utils';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    AsyncPipe,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList {
  public pokemonService = inject(PokemonServices);
  pokemons$ = this.pokemonService.getPokemonsSummaryWithTypes();
  pokemonTypes$ = this.pokemonService.getAllPokemonTypes();

  selectedTypeControl = new FormControl('all');

  selectedOrderControl = new FormControl('id');

  isInitialized = false

  // Filtrage des pokemons avec combine latest afin de lancer le filtrage quand un élément de la liste a été émis à nouveau
  filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.selectedTypeControl.valueChanges.pipe(startWith('all')),
    this.selectedOrderControl.valueChanges.pipe(startWith('id')),
  ]).pipe(
    // via destructuration on récupère les élements du combineLatest afin de les réutiliser pour le filtrage éventuel
    // puis l'ordre des éléments
    map(([pokemons, selectedType, selectedOrder]) => {
      // si pas de filtrage uniquement renvoyer le tableau apris qu'il ait été ordonné
      if (selectedType === 'all') {
        return sortPokemons(selectedOrder!, pokemons);
      }
      // sinon d'abord récupérer les pokemons correspondant au filtre puis les mettre dans l'ordre attendu
      const pokemonsToSort = pokemons.filter((pokemon) => {
        return pokemon.types.some(t => t.type.name === selectedType);
      });
      return sortPokemons(selectedOrder!, pokemonsToSort);
    })
  );

}
