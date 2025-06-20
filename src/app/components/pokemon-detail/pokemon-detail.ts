import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonServices} from '../../pokemon-services';
import {AsyncPipe} from '@angular/common';
import {Observable, switchMap} from 'rxjs';
import {PokemonDetails} from '../../types/type';

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
  public pokemonService = inject(PokemonServices);
  pokemon$: Observable<PokemonDetails>;

  constructor(private route: ActivatedRoute) {
    this.pokemon$ = this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('name')!;
        return this.pokemonService.getPokemonDetails(name);
      })
    );
  }
}
