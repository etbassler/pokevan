import { tailwindBreakpoint } from "./tailwind";

// write test for tailwindBreakpoint
describe("tailwindBreakpoint", () => {
  it("should return the correct breakpoint for the window width", () => {
    // mock window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1536,
    });
    expect(tailwindBreakpoint(1, 2, 3, 4, 5, 6)).toBe(6);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1280,
    });
    expect(tailwindBreakpoint(1, 2, 3, 4, 5, 6)).toBe(5);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    expect(tailwindBreakpoint(1, 2, 3, 4, 5, 6)).toBe(4);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });
    expect(tailwindBreakpoint(1, 2, 3, 4, 5, 6)).toBe(3);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 640,
    });
    expect(tailwindBreakpoint(1, 2, 3, 4, 5, 6)).toBe(2);

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 320,
    });
    expect(tailwindBreakpoint(1, 2, 3, 4, 5, 6)).toBe(1);
  });
});
