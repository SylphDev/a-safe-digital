import { render, screen, act } from "@testing-library/react";
import CustomSemiCircularGraph from "../semi-circular";

describe("CustomSemiCircularGraph", () => {
  it("Renders graph without crashing", async () => {
    const data = { Premium: 10, Free: 20 };
    await act(async () => {
      render(<CustomSemiCircularGraph data={data} />);
    });
    expect(screen.getByTestId("semi-circular-chart")).toBeInTheDocument();
  });

  it("Handles empty data", async () => {
    const data = {};
    await act(async () => {
      render(<CustomSemiCircularGraph data={data} />);
    });
    const chart = screen.getByTestId("semi-circular-chart");
    expect(chart).toBeInTheDocument();
  });

  it("Handles invalid data", async () => {
    const data = { Premium: Infinity, Free: NaN };
    await act(async () => {
      render(<CustomSemiCircularGraph data={data} />);
    });
    const chart = screen.getByTestId("semi-circular-chart");
    expect(chart).toBeInTheDocument();
  });

  it("Renders correctly on small screens (Responsive)", async () => {
    const data = { Premium: 10, Free: 20 };
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 500,
    });
    await act(async () => {
      render(<CustomSemiCircularGraph data={data} />);
    });
    const chart = screen.getByTestId("semi-circular-chart");
    expect(chart).toBeInTheDocument();
  });
});
