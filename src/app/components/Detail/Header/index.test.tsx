import { render, screen } from "@testing-library/react";

import { pokemon } from "@/mocks/pokemon";
import { DetailHeader } from ".";

describe("Details Header Component", () => {
  // mock useRouter

  it("renders the details header of the pokemon details page", () => {
    render(<DetailHeader pokemon={pokemon} />);

    // check if the name is visible
    const name = screen.getByText(pokemon.name);
    expect(name).toBeVisible();

    // check if the image is visible
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveClass("front");
    expect(images[1]).toHaveClass("back");
  });
});
