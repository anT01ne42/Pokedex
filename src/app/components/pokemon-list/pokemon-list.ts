import { Component, inject } from '@angular/core';
import { PokemonServices } from '../../pokemon-services';
import { combineLatest, map, startWith, tap } from 'rxjs';
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

  searchControl = new FormControl('');

  isLoading = true;
  hasData = false;

  // Filtrage des pokemons avec combine latest afin de lancer le filtrage quand un élément de la liste a été émis à nouveau
  filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.selectedTypeControl.valueChanges.pipe(startWith('all')),
    this.selectedOrderControl.valueChanges.pipe(startWith('id')),
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    tap(() => {
      this.isLoading = true;
      this.hasData = false;
    }),
    // via destructuration on récupère les élements du combineLatest afin de les réutiliser pour le filtrage éventuel
    // puis l'ordre des éléments
    map(([pokemons, selectedType, selectedOrder, searchControl]) => {
      // si pas de filtrage par type uniquement filtrer par nom puis ordonner les résultats
      if (selectedType === 'all') {
        const nameFilteredPokemons = pokemons.filter((pokemon) => pokemon.name.includes(searchControl || ''))
        return sortPokemons(selectedOrder!, nameFilteredPokemons);
      }
      // sinon d'abord récupérer les pokemons correspondant au filtres type et nom
      const pokemonsToSort = pokemons
        .filter((pokemon) => {
          return pokemon.name.includes(searchControl || '') && pokemon.types.some(t => t.type.name === selectedType)
        });
      // puis les mettre dans l'ordre attendu
      return sortPokemons(selectedOrder!, pokemonsToSort);
    }),
    tap(pokemons => {
      this.isLoading = false;
      this.hasData = pokemons.length > 0;
    })
  );

  // permet quand le composant est monté de récupérer les pokemon intiallement
  ngOnInit(): void {
    this.filteredPokemons$.subscribe();
  }
}
