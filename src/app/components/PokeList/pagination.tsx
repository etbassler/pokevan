import Image from "next/image";
import { useRouter } from "next/router";
import { INamedApiResource, IPokemon } from "pokeapi-typescript";
import { useEffect } from "react";

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
  // check router query for pagination
  // if it exists, set the pagination to the query
  // otherwise, set it to 0
  const router = useRouter();

  useEffect(() => {
    if (router.query.page) {
      setPagination(parseInt(router.query.page as string));
    } else {
      setPagination(0);
    }
  }, [router.query.page, setPagination]);

  function generatePaginationNumbers(startNumber: number) {
    const numbers = [];
    let currentNumber = startNumber - 1;

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
    <nav
      aria-label="Page navigation example"
      data-testid="pokelist-pagination"
      className="fixed md:relative left-0 bottom-0 w-full flex justify-center items-center z-30 bg-black md:bg-transparent bg-opacity-40"
    >
      <ul className="flex items-center justify-center -space-x-px h-10 text-base w-full my-4">
        <li>
          <button
            data-testid="pokelist-previous"
            disabled={pagination === 0}
            onClick={() => {
              router.push({
                query: { page: (pagination - 1).toString() },
              });
              setPagination(pagination - 1);
            }}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-gray-600 border  border-gray-300 rounded-s-lg hover:bg-red-600 focus:bg-red-600"
          >
            <span className="sr-only">Previous</span>
            <Image
              src={"/icons/previous.svg"}
              alt="Previous"
              width={10}
              height={10}
            />
          </button>
        </li>

        {generatePaginationNumbers(pagination).map((number, index) => {
          return (
            <li key={number}>
              <button
                onClick={() => {
                  router.push({
                    query: { page: (number - 1).toString() },
                  });
                  setPagination(number - 1);
                }}
                className={`relative  items-center justify-center px-4 h-10 leading-tight  border border-gray-300 hover:bg-red-600 focus:bg-red-600 ${
                  number === pagination + 1
                    ? "flex font-bold before:bg-white before:content-[''] before:w-1/2 before:h-1/2 before:absolute before:top-3 before:left-3 before:z-10 before:rounded-full before:border-2 after:bg-red-600 after:content-[''] after:w-full after:h-1/2 after:absolute hover:after:bg-white hover:animate-spin  after:top-0 text-black bg-white rounded-full overflow-hidden mx-2 h-12 w-12 p-0"
                    : "bg-gray-600 hidden sm:flex"
                }`}
              >
                <span className="block z-20">{number}</span>
              </button>
            </li>
          );
        })}
        <li>
          <button
            data-testid="pokelist-next"
            disabled={pagination === paginatedGroups.length - 1}
            onClick={() => {
              router.push({
                query: { page: (pagination + 1).toString() },
              });
              setPagination(pagination + 1);
            }}
            className="flex items-center justify-center px-4 h-10 leading-tight bg-gray-600 border border-gray-300 rounded-e-lg hover:bg-red-600 focus:bg-red-600"
          >
            <span className="sr-only">Next</span>
            <Image src={"/icons/next.svg"} alt="Next" width={10} height={10} />
          </button>
        </li>
      </ul>
    </nav>
  );
};
