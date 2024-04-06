// This is the component that will be used to display the gameboy wrapper width the children inside

import { IPokemon } from "pokeapi-typescript";
import Image from "next/image";
import { useState } from "react";

type DetailHeaderProps = {
  pokemon: IPokemon;
};

export const DetailHeader = ({ pokemon }: DetailHeaderProps) => {
  const [frontImageLoaded, setFrontImageLoaded] = useState(false);
  const [backImageLoaded, setBackImageLoaded] = useState(false);
  return (
    <>
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 capitalize break-words">
        {pokemon.name}
      </h1>
      <div className="gif-effect max-w-full">
        <Image
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} front`}
          width={48}
          height={48}
          className={`w-48 h-48 front max-w-full ${
            backImageLoaded && frontImageLoaded ? "loaded" : ""
          }`}
          onLoad={() => setFrontImageLoaded(true)}
        />
        <Image
          src={pokemon.sprites.back_default}
          alt={`${pokemon.name} back`}
          width={48}
          height={48}
          className={`w-48 h-48 back max-w-full ${
            backImageLoaded && frontImageLoaded ? "loaded" : ""
          }`}
          onLoad={() => setBackImageLoaded(true)}
        />
      </div>
    </>
  );
};
