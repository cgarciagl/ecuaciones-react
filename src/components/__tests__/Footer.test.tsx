import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
  it("renders the author and shortcuts", () => {
    render(<Footer />);
    expect(screen.getByText(/by Carlos García Trujillo/)).toBeInTheDocument();
    expect(screen.getByText(/Raton: rotar/)).toBeInTheDocument();
    expect(screen.getByText("Scroll")).toBeInTheDocument();
    expect(screen.getByText("Shift")).toBeInTheDocument();
  });
});
