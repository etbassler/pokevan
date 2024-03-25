import type { GetServerSideProps } from "next";
import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import { useRouter } from "next/router";

type PokemonProps = {
  pokemon: IPokemon;
};

export default function Pokemon({ pokemon }: PokemonProps) {
  const [frontImageLoaded, setFrontImageLoaded] = useState(false);
  const [backImageLoaded, setBackImageLoaded] = useState(false);
  const [colorMode, setColorMode] = useState(false);

  const router = useRouter();

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
                  className={` p-2 rounded-full w-5 h-5 ${
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
                className={`relative bg-gbYellow p-5 sm:p-10 flex flex-col sm:flex-row justify-between items-stretch h-full  after:absolute after:content-[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-gbYellow after:pointer-events-none ${
                  colorMode === false ? "after:opacity-40" : "after:opacity-0"
                }`}
              >
                <div
                  className={`relative flex items-stretch h-full w-full ${
                    colorMode === false && "saturate-0"
                  }`}
                >
                  <button
                    onClick={() => router.back()}
                    className={`absolute top-0 right-6 flex flex-col items-start text-gray-800 font-bold`}
                  >
                    Back
                  </button>
                  <div className="flex flex-col w-full">
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
                    <div className="flex flex-col sm:flex-row sm:justify-between divide-gray-800 divide-y-2 divide-dashed gap-2 sm:divide-y-0">
                      <div className="divide-y-2 divide-dashed divide-gray-800 flex flex-col gap-2">
                        <div className=" font-semibold text-gray-800">
                          <h2 className="text-2xl">Height</h2>
                          <div>{pokemon.height}</div>
                        </div>

                        <div className="font-semibold text-gray-800">
                          <h2 className="text-2xl">Weight</h2>
                          <div>{pokemon.weight}</div>
                        </div>
                        <div className=" font-semibold text-gray-800">
                          <h2 className="text-2xl">Types</h2>
                          <ul>
                            {pokemon.types.map((type) => (
                              <li key={type.type.name}>{type.type.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="divide-y-2 divide-dashed divide-gray-800 flex flex-col gap-2">
                        <div className=" font-semibold text-gray-800 ">
                          <h2 className="text-2xl">Abilities</h2>
                          <ul>
                            {pokemon.abilities.map((ability) => (
                              <li key={ability.ability.name}>
                                {ability.ability.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className=" font-semibold text-gray-800 ">
                          <h2 className="text-2xl">Stats</h2>
                          <ul>
                            {pokemon.stats.map((stat) => (
                              <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
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
