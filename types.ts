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

export interface EnhancedPokemon extends DetailedPokemon {
  id: number;
  height: number;
  weight: number;
  highResImage: string;
  stats: { name: string; value: number }[];
}
