import {PokemonDetails, PokemonWithTypes} from "../types/type";

/**
 * ordonne un tableau de pokemons selon la condition spécifiée
 * @param sortCondition condition, attendue : "id", "asc" ou "desc"
 * @param pokemonArray tableau de pokemon à ordonner
 * @returns tableau de pokemon ordonné
 */
export const sortPokemons = (sortCondition: string, pokemonArray: PokemonWithTypes[]): PokemonWithTypes[] => {
    switch (sortCondition) {
        case 'id':
            return pokemonArray.sort((a, b) => a.id - b.id);
        case 'asc':
            return pokemonArray.sort((a, b) => a.name.localeCompare(b.name));
        case 'desc':
            return pokemonArray.sort((a, b) => b.name.localeCompare(a.name));

        default:
            return pokemonArray.sort((a, b) => a.id - b.id);
    }
}
