import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Loader } from ".";

describe("Loader Component", () => {
  it("renders the Loader component", () => {
    render(<Loader />);
    expect(screen.getByAltText("pokeball loader")).toBeVisible();
  });
});
