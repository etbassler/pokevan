import PokeAPI, { INamedApiResourceList, IPokemon } from "pokeapi-typescript";

import { useQuery } from "@tanstack/react-query";

export const useAllPokemon = () => {
  const queryKey = ["Pokemon"];

  return {
    ...useQuery<INamedApiResourceList<IPokemon>>({
      queryKey,
      queryFn: async () => {
        const pokemonList = await PokeAPI.Pokemon.listAll();
        return pokemonList;
      },
      staleTime: 60000,
      refetchInterval: 60000,
    }),
  };
};

export const usePokemonDetail = (pokemonNameOrId: string) => {
  const queryKey = ["pokemonId", pokemonNameOrId];

  return {
    ...useQuery<IPokemon>({
      queryKey,
      queryFn: async () => {
        const pokemon = await PokeAPI.Pokemon.fetch(pokemonNameOrId);
        return pokemon;
      },
      staleTime: 60000,
      refetchInterval: 60000,
    }),
  };
};
