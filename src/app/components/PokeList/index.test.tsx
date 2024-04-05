import { fireEvent, render, screen } from "@testing-library/react";

import { PokeList } from ".";
import { pokeList } from "@/mocks/pokeList";

jest.mock("next/router", () => ({
  useRouter: () => ({
    back: jest.fn,
    push: jest.fn,
    query: { page: 1 },
  }),
}));
describe("Pokelist Component", () => {
  it("renders the Pokelist component with pagination and tests the next and previous pagination buttons", () => {
    render(<PokeList pokemon={pokeList} />);
    const pokeListComponent = screen.getByTestId("pokeList");
    expect(pokeListComponent).toBeInTheDocument();

    let pokeListItems = screen.getAllByRole("link");
    expect(pokeListItems).toHaveLength(8);
    expect(pokeListItems[0]).toHaveTextContent("nidoran-f");
    expect(screen.getByTestId("pokelist-pagination")).toBeVisible();
    const next = screen.getByTestId("pokelist-next");
    expect(next).toBeVisible();
    fireEvent.click(next);

    pokeListItems = screen.getAllByRole("link");
    expect(pokeListItems).toHaveLength(8);
    expect(pokeListItems[0]).toHaveTextContent("vulpix");

    const previous = screen.getByTestId("pokelist-previous");
    expect(previous).toBeVisible();
    fireEvent.click(previous);

    pokeListItems = screen.getAllByRole("link");
    expect(pokeListItems).toHaveLength(8);
    expect(pokeListItems[0]).toHaveTextContent("nidoran-f");
  });
});
