import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("renders the brand title", () => {
    render(<Header />);
    expect(screen.getByText(/Superficie/)).toBeInTheDocument();
    expect(screen.getByText("3D")).toBeInTheDocument();
  });

  it("renders the laboratorio subtitle", () => {
    render(<Header />);
    expect(screen.getByText(/Laboratorio matematico/)).toBeInTheDocument();
  });
});
