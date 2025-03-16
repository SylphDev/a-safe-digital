import { render, screen, act } from "@testing-library/react";
import CustomLineGraph from "../line";

describe("CustomLineGraph", () => {
  it("Renders graph without crashing", async () => {
    const data = { 29: 10, 32: 20 };
    await act(async () => {
      render(<CustomLineGraph data={data} />);
    });
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("Handles empty data", async () => {
    const data = {};
    await act(async () => {
      render(<CustomLineGraph data={data} />);
    });
    const chart = screen.getByTestId("line-chart");
    expect(chart).toBeInTheDocument();
  });

  it("Handles invalid data", async () => {
    const data = { 29: Infinity, 32: NaN };
    await act(async () => {
      render(<CustomLineGraph data={data} />);
    });
    const chart = screen.getByTestId("line-chart");
    expect(chart).toBeInTheDocument();
  });

  it("Renders correctly on small screens (Responsive)", async () => {
    const data = { 29: 10, 32: 20 };
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 500,
    });
    await act(async () => {
      render(<CustomLineGraph data={data} />);
    });
    const chart = screen.getByTestId("line-chart");
    expect(chart).toBeInTheDocument();
  });
});
