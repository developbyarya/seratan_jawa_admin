import Home from "../../pages/index";
import { render } from "@testing-library/react";

describe("READ DOCUMENT IN FIRESTORE", () => {
  it("get all data", () => {
    render(<Home />);
  });
});
