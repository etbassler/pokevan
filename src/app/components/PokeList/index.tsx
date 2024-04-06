import { tailwindBreakpoint } from "@/app/utilities/tailwind";
import Image from "next/image";
import { INamedApiResourceList, IPokemon } from "pokeapi-typescript";
import { useEffect, useState } from "react";
import { PokeListPagination } from "./pagination";
import Link from "next/link";

type PokeListProps = {
  pokemon: INamedApiResourceList<IPokemon>;
};

export const PokeList = ({ pokemon }: PokeListProps) => {
  const [pagination, setPagination] = useState(0);
  const [displayCount, setDisplayCount] = useState(
    tailwindBreakpoint(4, 6, 6, 8, 8, 8)
  );

  const paginatedGroups = [];

  useEffect(() => {
    const handleResize = () =>
      setDisplayCount(tailwindBreakpoint(3, 6, 6, 8, 8, 8));
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  for (let i = 0; i < pokemon.results.length; i += displayCount as number) {
    paginatedGroups.push(pokemon.results.slice(i, i + displayCount));
  }

  return (
    <div className="w-full">
      <div data-testid="pokeList" className="flex flex-wrap items-start w-full">
        {paginatedGroups[pagination].map((poke) => (
          <div key={poke.name} className="p-2 basis-1/4 flex grow">
            <Link
              href={`/pokemon/${poke.url.match(/\/(\d+)\//)?.[1]}`}
              className="relative group grow flex flex-col items-center  p-6 pt-2 mt-[10px] bg-gray-400 rounded-b-md rounded-r-md shadow-md before:content-[''] before:absolute before:w-11/12 before:h-[10px] before:bg-gray-400 before:bottom-full before:left-0 before:rounded-t-md  after:content-[''] after:absolute after:w-full after:h-[20px] after:border-t-4 after:border-b-4 after:border-gray-600 after:top-[25px] after:left-0  after:z-0 hover: "
            >
              <h2 className="text-lg z-10 bg-gray-500 mb-2 font-semibold p-2 w-full text-center rounded-full text-grey-400 border-4 border-gray-600 uppercase italic ">
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
            </Link>
          </div>
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
