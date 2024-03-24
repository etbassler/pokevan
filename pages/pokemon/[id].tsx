import type { GetServerSideProps } from "next";
import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/Header";

type PokemonProps = {
  pokemon: IPokemon;
};

export default function Pokemon({ pokemon }: PokemonProps) {
  console.log(pokemon, "pokemon render");
  const [frontImageLoaded, setFrontImageLoaded] = useState(false);
  const [backImageLoaded, setBackImageLoaded] = useState(false);
  const [colorMode, setColorMode] = useState(false);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex items-stretch justify-center px-5 h-full grow">
          <div className="bg-gray-400 pt-8 px-4 sm:pt-20 sm:px-10 w-full max-w-5xl rounded-t-lg">
            <div className="relative bg-gray-600 px-20 pt-10 rounded-t-xl w-full h-full">
              <button
                onClick={() => setColorMode(!colorMode)}
                className={`absolute top-20 left-6 flex flex-col items-start`}
              >
                <div
                  className={` p-2 rounded-full w-5 h-5 rounded-full ${
                    colorMode === false
                      ? "bg-gray-800"
                      : "bg-red-600 shadow-lg shadow-red-600"
                  }`}
                ></div>
                <span className="text-[10px] mt-4 uppercase">
                  {colorMode === false ? "Original" : "Color"}
                </span>
              </button>
              <div
                className={`relative bg-gbYellow p-5 sm:p-10 flex flex-col sm:flex-row justify-between items-stretch h-full  after:absolute after:content-[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-gbYellow ${
                  colorMode === false ? "after:opacity-40" : "after:opacity-0"
                }`}
              >
                <div
                  className={`flex flex-col sm:flex-row sm:justify-between items-stretch h-full w-full ${
                    colorMode === false && "saturate-0"
                  }`}
                >
                  <div className="flex flex-col ">
                    <h1 className="text-4xl font-bold text-gray-800 capitalize">
                      {pokemon.name}
                    </h1>
                    <div className="gif-effect">
                      <Image
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        width={48}
                        height={48}
                        className={`w-48 h-48 front ${
                          backImageLoaded && frontImageLoaded ? "loaded" : ""
                        }`}
                        onLoad={() => setFrontImageLoaded(true)}
                      />

                      <Image
                        src={pokemon.sprites.back_default}
                        alt={pokemon.name}
                        width={48}
                        height={48}
                        className={`w-48 h-48 back ${
                          backImageLoaded && frontImageLoaded ? "loaded" : ""
                        }`}
                        onLoad={() => setBackImageLoaded(true)}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Abilities
                    </h2>
                    <ul>
                      {pokemon.abilities.map((ability) => (
                        <li key={ability.ability.name}>
                          {ability.ability.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pokemon = await PokeAPI.Pokemon.fetch(query.id as string);
  return { props: { pokemon } };
};
