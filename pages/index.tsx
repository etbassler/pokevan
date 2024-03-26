import { Header } from "@/app/components/Header";
import { Loader } from "@/app/components/Loader";
import { PokeList } from "@/app/components/PokeList";
import { useAllPokemon } from "@/app/hooks/usePokemon";
import Image from "next/image";

export default function Home() {
  const { data: Pokemon, isError, isLoading } = useAllPokemon();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col justify-center items-center p-24 pt-5">
        <div className="relative flex justify-center items-center w-full max-w-5xl pt-4">
          {isLoading ? (
            <Loader />
          ) : !isError && Pokemon ? (
            <PokeList pokemon={Pokemon} />
          ) : (
            <div className="p-5 bg-gray-600 font-bold italic rounded-md">
              Error: You have to catch them all first!
            </div>
          )}
        </div>
      </main>
    </>
  );
}
