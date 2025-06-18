import { Routes } from '@angular/router';
import {PokemonList} from './components/pokemon-list/pokemon-list';
import { PokemonServices } from './pokemon-services';
import {PokemonDetail} from './components/pokemon-detail/pokemon-detail';

export const routes: Routes = [
  { path: '', component: PokemonList },
  { path: 'details/:name', component: PokemonDetail }
];
