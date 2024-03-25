import { tailwindBreakpoint } from "@/app/utilities/tailwind";
import Image from "next/image";
import { INamedApiResource, IPokemon } from "pokeapi-typescript";
import { useState } from "react";

type PokeListPaginationProps = {
  paginatedGroups: INamedApiResource<IPokemon>[][];
  pagination: number;
  setPagination: (value: number) => void;
};

export const PokeListPagination = ({
  paginatedGroups,
  pagination,
  setPagination,
}: PokeListPaginationProps) => {
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

  return (
    <nav aria-label="Page navigation example" data-testid="pokelist-pagination">
      <ul className="flex items-center -space-x-px h-10 text-base w-full mt-5">
        <li>
          <button
            data-testid="pokelist-previous"
            disabled={pagination === 0}
            onClick={() => setPagination(pagination - 1)}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-gray-700 border border-e-0 border-gray-300 rounded-s-lg hover:bg-red-600 focus:bg-red-600"
          >
            <span className="sr-only">Previous</span>
            <Image
              src={"/icons/previous.svg"}
              alt="Next"
              width={10}
              height={10}
            />
          </button>
        </li>

        {generatePaginationNumbers(pagination).map((number, index) => {
          return (
            <li key={number}>
              <button
                onClick={() => setPagination(number - 1)}
                className={`relative flex items-center justify-center px-4 h-10 leading-tight  border border-gray-300 hover:bg-red-600 focus:bg-red-600 ${
                  number === pagination + 1
                    ? "font-bold after:bg-red-600 after:content-[''] after:w-full after:h-1/2 after:absolute hover:after:bg-white hover:animate-spin  after:top-0 text-black bg-white rounded-full overflow-hidden mx-2"
                    : "bg-gray-700"
                }`}
              >
                <span className="block z-10">{number}</span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            data-testid="pokelist-next"
            disabled={pagination === paginatedGroups.length - 1}
            onClick={() => setPagination(pagination + 1)}
            className="flex items-center justify-center px-4 h-10 leading-tight bg-gray-700 border border-gray-300 rounded-e-lg hover:bg-red-600 focus:bg-red-600"
          >
            <span className="sr-only">Next</span>
            <Image src={"/icons/next.svg"} alt="Next" width={10} height={10} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
