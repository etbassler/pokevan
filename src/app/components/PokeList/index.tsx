import { tailwindBreakpoint } from "@/app/utilities/tailwind";
import Image from "next/image";
import { INamedApiResourceList, IPokemon } from "pokeapi-typescript";
import { useState } from "react";
import { PokeListPagination } from "./pagination";
import { useRouter } from "next/router";

type PokeListProps = {
  pokemon: INamedApiResourceList<IPokemon>;
};

export const PokeList = ({ pokemon }: PokeListProps) => {
  const [pagination, setPagination] = useState(0);
  const paginatedGroups = [];

  const displayCount = tailwindBreakpoint(3, 6, 9, 12, 15, 15);

  for (let i = 0; i < pokemon.results.length; i += displayCount as number) {
    paginatedGroups.push(pokemon.results.slice(i, i + displayCount));
  }

  const router = useRouter();

  return (
    <div className="w-full">
      <div
        data-testid="pokeList"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full"
      >
        {paginatedGroups[pagination].map((poke) => (
          <button
            key={poke.name}
            onClick={() => {
              router.push(`/pokemon/${poke.url.match(/\/(\d+)\//)?.[1]}`);
            }}
            className="relative group flex flex-col items-center justify-center p-6 pt-2 mt-[10px] bg-gray-400 rounded-b-md rounded-r-md shadow-md before:content-[''] before:absolute before:w-11/12 before:h-[10px] before:bg-gray-400 before:bottom-full before:left-0 before:rounded-t-md  after:content-[''] after:absolute after:w-full after:h-[20px] after:border-t-4 after:border-b-4 after:border-gray-600 after:top-[25px] after:left-0  after:z-0 hover: "
          >
            <h2 className="text-lg z-10 bg-gray-400 mb-2 font-semibold p-2 w-full text-center rounded-full text-grey-400 border-4 border-gray-600 uppercase italic ">
              {poke.name}
            </h2>

            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                poke.url.match(/\/(\d+)\//)?.[1]
              }.png`}
              alt={poke.name}
              width={96}
              height={96}
              className="border-4 border-gray-600 w-full saturate-0 group-hover:animate-pulse group-hover:saturate-100 group-focus:animate-pulse group-focus:saturate-100"
            />
          </button>
        ))}
      </div>
      {pokemon.results.length > displayCount && (
        <PokeListPagination
          paginatedGroups={paginatedGroups}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
};
