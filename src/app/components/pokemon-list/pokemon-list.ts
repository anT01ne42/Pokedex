import { Component, inject } from '@angular/core';
import { PokemonServices } from '../../pokemon-services';
import { Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css'
})
export class PokemonList {
  public pokemonService = inject(PokemonServices);
  pokemons$ = this.pokemonService.getPokemons();
}
