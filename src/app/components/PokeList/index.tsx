import Image from "next/image";
import { INamedApiResourceList, IPokemon } from "pokeapi-typescript";
import { useState } from "react";

type PokeListProps = {
  pokemon: INamedApiResourceList<IPokemon>;
};

export const PokeList = ({ pokemon }: PokeListProps) => {
  const [pagination, setPagination] = useState(1);
  const paginatedGroups = [];

  function generatePaginationNumbers(startNumber: number) {
    const numbers = [];
    let currentNumber = startNumber - 2;

    while (numbers.length < 5 && currentNumber <= paginatedGroups.length) {
      if (currentNumber <= 0) {
        currentNumber++;
      } else {
        numbers.push(currentNumber);
        currentNumber++;
      }
    }

    return numbers;
  }

  for (let i = 0; i < pokemon.results.length; i += 20) {
    paginatedGroups.push(pokemon.results.slice(i, i + 20));
  }
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {paginatedGroups[pagination].map((poke) => (
          <div
            key={poke.name}
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                poke.url.match(/\/(\d+)\//)?.[1]
              }.png`}
              alt={poke.name}
              width={96}
              height={96}
            />
            <h2 className="text-lg font-semibold">{poke.name}</h2>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base w-full">
          <li>
            <button
              disabled={pagination === 1}
              onClick={() => setPagination(pagination - 1)}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {generatePaginationNumbers(pagination).map((number, index) => {
            return (
              <li key={number}>
                <button
                  onClick={() => setPagination(number)}
                  className={`${
                    number === pagination ? "font-bold" : ""
                  }flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {number}
                </button>
              </li>
            );
          })}
          <li>
            <button
              disabled={pagination === paginatedGroups.length}
              onClick={() => setPagination(pagination + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
