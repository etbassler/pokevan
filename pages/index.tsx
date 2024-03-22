import { Loader } from "@/app/components/Loader";
import { PokeList } from "@/app/components/PokeList";
import { useAllPokemon } from "@/app/hooks/usePokemon";
import Image from "next/image";

export default function Home() {
  const { data: Pokemon, isError, isLoading } = useAllPokemon();

  console.log(Pokemon, "pokemon");
  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 pt-5">
      <div className="z-10 max-w-5xl w-full flex justify-center md:justify-end mb-5">
        <Image
          src="/images/logo.png"
          alt="pok-evan-logo"
          width={200}
          height={200}
        />
      </div>

      <div className="relative flex justify-center items-center w-full max-w-5xl">
        {isLoading ? (
          <Loader />
        ) : Pokemon ? (
          <PokeList pokemon={Pokemon} />
        ) : (
          "No Pokemon Found"
        )}
      </div>
    </main>
  );
}
