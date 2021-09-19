import { all } from "../src/index";

describe("index unit tests", () => {
  describe("and test", () => {
    test("should be good", () => {
      jest.spyOn(console, "log");
      all();
      expect(console.log).toBeCalledWith("index::all ran");
    });
  });
});
