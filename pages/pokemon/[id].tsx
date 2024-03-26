import type { GetServerSideProps } from "next";
import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/Header";
import { useRouter } from "next/router";
import { ContentSection } from "@/app/components/ContentSection";

type PokemonProps = {
  pokemon: IPokemon;
};

export default function Pokemon({ pokemon }: PokemonProps) {
  const [frontImageLoaded, setFrontImageLoaded] = useState(false);
  const [backImageLoaded, setBackImageLoaded] = useState(false);
  const [colorMode, setColorMode] = useState(false);

  // function that takes in an array of of types and creates a radial gradient using the colors of the types using the pattern "from-bg-[type] via-bg-[type-3] to-bg-[type-2]"
  const createGradient = (types: string[]) => {
    let gradient = ``;
    if (types.length >= 3) {
      gradient = `bg-gradient-to-br from-${types[0]} to-${types[1]} via-${types[3]}`;
    } else if (types.length === 2) {
      gradient = `bg-gradient-to-br from-${types[0]} to-${types[1]} }`;
    } else {
      gradient = `bg-gradient-to-br from-${types[0]} to-white`;
    }
    return gradient;
  };
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex items-stretch justify-center px-5 h-full grow">
          <div className="relative bg-gray-400 pt-8 px-4 sm:pt-20 sm:px-10 w-full max-w-5xl rounded-t-lg after:absolute after:top-[15px] after:left-0 after:content-[''] after:w-full after:h-[10px] after:shadow-inside   sm:after:h-[20px] sm:after:top-[40px]">
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
              {pokemon === null ? (
                <div
                  className={` bg-gbYellow  p-5 sm:p-10 flex flex-col sm:flex-row justify-between items-stretch h-full
                    `}
                >
                  <h1 className="text-4xl font-bold text-gray-800 capitalize">
                    Error: Low Battery
                  </h1>
                </div>
              ) : (
                <div
                  className={`relative  p-5 sm:p-10 flex flex-col sm:flex-row justify-between items-stretch h-full  after:absolute after:content-[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-gbYellow after:pointer-events-none ${
                    colorMode === false
                      ? "after:opacity-40 bg-gbYellow"
                      : `after:opacity-0 ${createGradient(
                          pokemon.types.map((type) => type.type.name)
                        )}`
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
                          <ContentSection
                            header="Height"
                            content={pokemon.height}
                          />

                          <ContentSection
                            header="Weight"
                            content={pokemon.weight}
                          />

                          <ContentSection
                            header="Types"
                            content={
                              <ul>
                                {pokemon.types.map((type) => (
                                  <li key={type.type.name}>{type.type.name}</li>
                                ))}
                              </ul>
                            }
                          />
                        </div>
                        <div className="divide-y-2 divide-dashed divide-gray-800 flex flex-col gap-2">
                          <ContentSection
                            header="Abilities"
                            content={
                              <ul>
                                {pokemon.abilities.map((ability) => (
                                  <li key={ability.ability.name}>
                                    {ability.ability.name}
                                  </li>
                                ))}
                              </ul>
                            }
                          />
                          <ContentSection
                            header="Stats"
                            content={
                              <ul>
                                {pokemon.stats.map((stat) => (
                                  <li key={stat.stat.name}>
                                    {stat.stat.name}: {stat.base_stat}
                                  </li>
                                ))}
                              </ul>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
