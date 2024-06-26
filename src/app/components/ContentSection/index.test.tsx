import { render, screen } from "@testing-library/react";

import { ContentSection } from ".";

describe("ContentSection Component", () => {
  it("renders the ContentSEction component with header and content.", () => {
    render(<ContentSection header="Ability" content={"The Content"} />);

    expect(screen.getByText("Ability")).toBeVisible();
    expect(screen.getByText("The Content")).toBeVisible();
  });
});
