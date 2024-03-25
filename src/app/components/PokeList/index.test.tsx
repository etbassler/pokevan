import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { PokeList } from ".";
import { pokeList } from "@/mocks/pokeList";

describe("Pokelist Component", () => {
  it("renders the Pokelist component with pagination and tests the next and previous pagination buttons", () => {
    render(<PokeList pokemon={pokeList} />);
    const pokeListComponent = screen.getByTestId("pokeList");
    expect(pokeListComponent).toBeInTheDocument();

    let pokeListItems = screen.getAllByRole("button");
    expect(pokeListItems).toHaveLength(19);
    expect(pokeListItems[0]).toHaveTextContent("spearow");
    expect(screen.getByTestId("pokelist-pagination")).toBeVisible();
    const next = screen.getByTestId("pokelist-next");
    expect(next).toBeVisible();
    fireEvent.click(next);

    pokeListItems = screen.getAllByRole("button");
    expect(pokeListItems).toHaveLength(19);
    expect(pokeListItems[0]).toHaveTextContent("nidorino");

    const previous = screen.getByTestId("pokelist-previous");
    expect(previous).toBeVisible();
    fireEvent.click(previous);

    pokeListItems = screen.getAllByRole("button");
    expect(pokeListItems).toHaveLength(19);
    expect(pokeListItems[0]).toHaveTextContent("spearow");
  });
});
