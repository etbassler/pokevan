// This is the component that will be used to display the gameboy wrapper width the children inside

import { useRouter } from "next/router";
import { IPokemon } from "pokeapi-typescript";
import { ReactElement, useState } from "react";

type GameBoyWrapperProps = {
  pokemon: IPokemon;
  children: ReactElement;
};

export const GameBoyWrapper = ({ pokemon, children }: GameBoyWrapperProps) => {
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
    <div className="flex items-stretch justify-center px-5 h-full grow">
      <div className="relative flex flex-col bg-gray-400 pt-8 px-4 sm:pt-20 sm:px-10 w-full max-w-5xl rounded-t-lg after:absolute after:top-[15px] after:left-0 after:content-[''] after:w-full after:h-[10px] after:shadow-inside   sm:after:h-[20px] sm:after:top-[40px]">
        <div className="relative flex flex-col grow bg-gray-600 px-10 pt-5 sm:px-20 sm:pt-10 rounded-t-xl w-full h-full">
          <div className="flex justify-between sm:justify-end pb-3 ">
            <button
              onClick={() => setColorMode(!colorMode)}
              className={` sm:absolute top-32 left-6 flex sm:flex-col items-center sm:items-start`}
              aria-label="Toggle Color or Original Mode"
              disabled={pokemon === null}
            >
              <div
                className={` p-2 rounded-full w-5 h-5 ${
                  colorMode === false
                    ? "bg-gray-800"
                    : "bg-red-600 shadow-lg shadow-red-600"
                }`}
              ></div>
              <span className="text-[10px] ml-2 sm:ml-0 sm:mt-4 uppercase ">
                {colorMode === false ? "Original" : "Color"}
              </span>
            </button>
            <button
              onClick={() => router.back()}
              className={`flex text-white font-bold  items-start`}
            >
              Back
            </button>
          </div>

          {pokemon === null ? (
            <div
              className={` bg-gbYellow p-5 sm:p-10 flex flex-col sm:flex-row justify-between items-stretch min-h-full
            `}
            >
              <h1 className="text-4xl font-bold text-gray-800 capitalize">
                Error: Low Battery
              </h1>
            </div>
          ) : (
            <div
              className={`relative  p-5 sm:p-10 flex flex-col sm:flex-row justify-between items-stretch  after:absolute after:content-[''] after:h-full after:w-full after:top-0 after:left-0 after:bg-gbYellow after:pointer-events-none ${
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
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
