import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Services from "../pages/Services";

describe("Services Page", () => {
  test("renders Services heading", () => {
    render(<Services />);
    expect(screen.getByText("My Services")).toBeInTheDocument();
  });

  test("renders Web Development service card", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { name: "Web Development" })
    ).toBeInTheDocument();
  });

  test("renders React Applications service card", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { name: "React Applications" })
    ).toBeInTheDocument();
  });
});
