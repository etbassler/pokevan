import { render, screen } from "@testing-library/react";
import { pokemon } from "@/mocks/pokemon";
import { RightDetails } from ".";

describe("Right Details Component", () => {
  // mock useRouter

  it("renders the right side of the pokemon details content.", () => {
    render(<RightDetails pokemon={pokemon} />);

    const abilities = screen.getByText("Abilities");
    expect(abilities).toBeVisible();
    pokemon.abilities.forEach((ability) => {
      expect(screen.getByText(ability.ability.name)).toBeVisible();
    });

    const stats = screen.getByText("Stats");
    expect(stats).toBeVisible();

    pokemon.stats.forEach((stat) => {
      expect(
        screen.getByText(`${stat.stat.name}: ${stat.base_stat.toString()}`)
      ).toBeVisible();
    });
  });
});
