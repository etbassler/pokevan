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
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base w-full">
        <li>
          <button
            disabled={pagination === 1}
            onClick={() => setPagination(pagination - 1)}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
          console.log(number, "number", pagination, "pagination");
          return (
            <li key={number}>
              <button
                onClick={() => setPagination(number)}
                className={`${
                  number === pagination ? "font-bold " : ""
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
            <Image src={"/icons/next.svg"} alt="Next" width={10} height={10} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
