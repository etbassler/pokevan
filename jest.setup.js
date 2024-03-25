jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        chargerId: "900099-03",
        locationId: "39706",
      },
    };
  },
}));
