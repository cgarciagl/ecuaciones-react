import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBar } from "../StatusBar";
import { useStore } from "../../store";
import { resetStore } from "../../test/storeHelpers";

describe("StatusBar", () => {
  beforeEach(resetStore);

  it("renders the status message", () => {
    useStore.setState({
      status: { type: "ok", message: "Todo bien", timing: "" },
    });
    render(<StatusBar />);
    expect(screen.getByText("Todo bien")).toBeInTheDocument();
  });

  it("renders the timing in red when present", () => {
    useStore.setState({
      status: { type: "ok", message: "Listo", timing: "12 ms" },
    });
    render(<StatusBar />);
    const timing = screen.getByText("12 ms");
    expect(timing).toBeInTheDocument();
    expect(timing).toHaveClass("text-rust-500");
  });

  it("hides the timing span when timing is empty", () => {
    useStore.setState({
      status: { type: "ok", message: "Sin tiempo", timing: "" },
    });
    render(<StatusBar />);
    expect(screen.queryByText(/\d+ ms/)).not.toBeInTheDocument();
  });

  it("uses the error color when status type is error", () => {
    useStore.setState({
      status: { type: "error", message: "Algo fallo", timing: "" },
    });
    const { container } = render(<StatusBar />);
    const dot = container.querySelector("span.bg-red-500");
    expect(dot).toBeInTheDocument();
  });

  it("uses the moss color when status type is ok", () => {
    useStore.setState({
      status: { type: "ok", message: "OK", timing: "" },
    });
    const { container } = render(<StatusBar />);
    const dot = container.querySelector("span.bg-moss-600");
    expect(dot).toBeInTheDocument();
  });
});
