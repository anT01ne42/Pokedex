import { TestBed } from '@angular/core/testing';

import { PokemonServices } from './pokemon-services';

describe('PokemonServices', () => {
  let service: PokemonServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//Organisation des fichiers
//
//     PokemonService : méthodes getPokemons() et getPokemonDetails()
//
//     PokemonListComponent : appel de la liste, tri et navigation vers la page de détails
//
//     PokemonDetailComponent : appel getPokemonDetails(route.params.name) et affichage
//
// ​
