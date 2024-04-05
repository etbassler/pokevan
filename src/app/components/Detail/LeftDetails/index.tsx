// This is the component that will be used to display the gameboy wrapper width the children inside

import { IPokemon } from "pokeapi-typescript";
import { ContentSection } from "../../ContentSection";

type LeftDetailProps = {
  pokemon: IPokemon;
};

export const LeftDetails = ({ pokemon }: LeftDetailProps) => {
  return (
    <div className="divide-y-2 divide-dashed divide-gray-800 flex flex-col gap-2">
      <ContentSection header="Height" content={pokemon.height} />
      <ContentSection header="Weight" content={pokemon.weight} />
      <ContentSection
        header="Types"
        content={
          <ul>
            {pokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
        }
      />
    </div>
  );
};
