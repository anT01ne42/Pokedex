import { Component, inject } from '@angular/core';
import { PokemonServices } from '../../pokemon-services';
import {combineLatest, map, Observable, startWith} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

  // Filtrage des pokemons
  filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.selectedTypeControl.valueChanges.pipe(startWith('all')),
  ]).pipe(
    map(([pokemons, selectedType]) => {
      if (selectedType === 'all') {
        return pokemons;
      }
      return pokemons.filter((pokemon) => {
        return pokemon.types.some(t => t.type.name === selectedType);
      });
    })
  );

  /*filteredPokemons$ = combineLatest([
    this.pokemons$,
    this.selectedTypeControl.valueChanges.pipe(startWith('all')),

  ]).pipe(
    map(([pokemons, selectedType]) => {
      if (selectedType === 'all') {
        return pokemons;
      }
      return pokemons.filter((pokemon) => {
        return pokemon.types.some(t => t.type.name === selectedType);
      });
    })
  );*/

}
