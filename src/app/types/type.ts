export interface ResponsePokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonWithTypes {
  id: number;
  name: string;
  types: PokemonTypes[];
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  }
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_abilities: any;
  past_types: any[];
  species: any;
  sprites: Sprite[];
  stats: Stat[];
  types: PokemonTypes[];
  weight: number;
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

export interface Sprite {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
  front_default_female: string;
  front_shiny_female: string;
  back_default_female: string;
  back_shiny_female: string;
  other: any;
  versions: any;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface TypeInfo {
  name: string;
  url: string;
}

export interface ResponsePokemonTypeList {
  count: number;
  next: string | null;
  previous: string | null;
  results: TypeInfo[];
}
