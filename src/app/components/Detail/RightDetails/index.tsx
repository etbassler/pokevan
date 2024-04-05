// This is the component that will be used to display the gameboy wrapper width the children inside

import { IPokemon } from "pokeapi-typescript";
import { ContentSection } from "../../ContentSection";

type RightDetailProps = {
  pokemon: IPokemon;
};

export const RightDetails = ({ pokemon }: RightDetailProps) => {
  return (
    <div className="divide-y-2 divide-dashed divide-gray-800 flex flex-col gap-2">
      <ContentSection
        header="Abilities"
        content={
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        }
      />
      <ContentSection
        header="Stats"
        content={
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        }
      />
    </div>
  );
};
