export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface DetailedPokemon {
  name: string;
  frontShinyImgURL: string;
  backShinyImgURL: string;
  types: PokemonType[];
}

export interface basePoke {
  name: string;
  url: string;
}
