import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Header } from ".";

describe("Header Component", () => {
  it("renders the Header component with link and image visible.", () => {
    render(<Header />);
    expect(screen.getByTestId("header-logo")).toBeVisible();
    const headerLink = screen.getByTestId("header-link");
    expect(headerLink).toBeVisible();
  });
});
