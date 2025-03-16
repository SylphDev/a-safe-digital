import { render, screen, act } from "@testing-library/react";
import CustomBarGraph from "../bar";

describe("CustomBarGraph", () => {
  it("Renders graph without crashing", async () => {
    const data = { Spain: 10, Italy: 20 };
    await act(async () => {
      render(<CustomBarGraph data={data} />);
    });
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("Handles empty data", async () => {
    const data = {};
    await act(async () => {
      render(<CustomBarGraph data={data} />);
    });
    const chart = screen.getByTestId("bar-chart");
    expect(chart).toBeInTheDocument();
  });

  it("Handles invalid data", async () => {
    const data = { Spain: NaN, Italy: Infinity };
    await act(async () => {
      render(<CustomBarGraph data={data} />);
    });
    const chart = screen.getByTestId("bar-chart");
    expect(chart).toBeInTheDocument();
  });

  it("Renders correctly on small screens (Responsive)", async () => {
    const data = { Spain: 10, Italy: 20 };
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 500,
    });
    await act(async () => {
      render(<CustomBarGraph data={data} />);
    });
    const chart = screen.getByTestId("bar-chart");
    expect(chart).toBeInTheDocument();
  });
});
