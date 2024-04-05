import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { pokemon } from "@/mocks/pokemon";
import { LeftDetails } from ".";

describe("Left Details Component", () => {
  // mock useRouter

  it("renders the left side of the pokemon details component", () => {
    render(<LeftDetails pokemon={pokemon} />);

    const height = screen.getByText("Height");
    expect(height).toBeVisible();
    expect(screen.getByText(pokemon.height)).toBeVisible();

    const weight = screen.getByText("Weight");
    expect(weight).toBeVisible();
    expect(screen.getByText(pokemon.weight)).toBeVisible();

    const types = screen.getByText("Types");
    expect(types).toBeVisible();
    pokemon.types.forEach((type) => {
      expect(screen.getByText(type.type.name)).toBeVisible();
    });
  });
});
