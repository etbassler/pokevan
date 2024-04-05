import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { pokemon } from "@/mocks/pokemon";
import { RightDetails } from ".";

describe("Right Details Component", () => {
  // mock useRouter

  it("renders the right side of the pokemon details content.", () => {
    render(<RightDetails pokemon={pokemon} />);
  });
});
