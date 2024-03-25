import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { Loader } from ".";

describe("Loader Component", () => {
  it("renders the Loader component", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader")).toBeVisible();
  });
});
