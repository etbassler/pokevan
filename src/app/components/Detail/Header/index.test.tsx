import { render, screen } from "@testing-library/react";

import { pokemon } from "@/mocks/pokemon";
import { DetailHeader } from ".";

describe("Details Header Component", () => {
  // mock useRouter

  it("renders the left side of the pokemon details component", () => {
    render(<DetailHeader pokemon={pokemon} />);

    // check if the name is visible
    const name = screen.getByText(pokemon.name);
    expect(name).toBeVisible();

    // check if the image is visible
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
