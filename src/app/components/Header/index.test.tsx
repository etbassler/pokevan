import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Header } from ".";

describe("Header Component", () => {
  it("renders the Header component with link and image visible.", () => {
    render(<Header />);

    // "pok-evan-logo" is alt text for the image
    const image = screen.getByAltText("pok-evan-logo");
    expect(image).toBeVisible();

    const headerLink = screen.getByRole("link");
    expect(headerLink).toBeVisible();
  });
});
