import type { GetServerSideProps } from "next";
import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { Header } from "@/app/components/Header";
import Head from "next/head";
import { GameBoyWrapper } from "@/app/components/GameBoyWrapper";
import { RightDetails } from "@/app/components/Detail/RightDetails";
import { LeftDetails } from "@/app/components/Detail/LeftDetails";
import { DetailHeader } from "@/app/components/Detail/Header";

type PokemonProps = {
  pokemon: IPokemon;
};

export default function Pokemon({ pokemon }: PokemonProps) {
  return (
    <>
      <Head>
        <title>Pok-Evan: {pokemon.name.toUpperCase()} Detail Page</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <GameBoyWrapper pokemon={pokemon}>
          <div className="flex flex-col w-full">
            <DetailHeader pokemon={pokemon} />
            <div className="flex flex-col sm:flex-row sm:justify-between divide-gray-800 divide-y-2 divide-dashed gap-2 sm:divide-y-0">
              <LeftDetails pokemon={pokemon} />
              <RightDetails pokemon={pokemon} />
            </div>
          </div>
        </GameBoyWrapper>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const pokemon = await PokeAPI.Pokemon.fetch(query.id as string);
    return { props: { pokemon } };
  } catch {
    return { props: { pokemon: null } };
  }
};
