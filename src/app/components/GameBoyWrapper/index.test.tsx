import { fireEvent, render, screen } from "@testing-library/react";
import { pokemon } from "@/mocks/pokemon";
import { GameBoyWrapper } from ".";

const backFn = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    back: backFn,
  }),
}));
describe("Gameboy Wrapper Component", () => {
  // mock useRouter

  it("renders Gameboy Wrapper component, tests the back button, and tests the color change button", () => {
    render(
      <GameBoyWrapper pokemon={pokemon}>
        <div>This is the test</div>
      </GameBoyWrapper>
    );

    const content = screen.getByText("This is the test");
    expect(content).toBeVisible();

    let buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Original");
    expect(buttons[1]).toHaveTextContent("Back");

    // check color button
    fireEvent.click(buttons[0]);
    buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("Color");

    // check back button
    fireEvent.click(buttons[1]);
    expect(backFn).toHaveBeenCalled();
  });
});
