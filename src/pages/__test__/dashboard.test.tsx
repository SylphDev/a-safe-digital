import { render, screen, waitFor } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Dashboard, { getServerSideProps } from "../dashboard";
import axios from "axios";
import { getSession } from "next-auth/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "src/lib/theme";
import { CssBaseline } from "@mui/material";

jest.mock("next/router", () => require("next-router-mock"));

jest.mock("next-auth/react", () => ({
  getSession: jest.fn(),
  useSession: jest.fn(() => ({
    data: { user: { name: "Test User" } },
    status: "authenticated",
  })),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Redirects to / if user is not authenticated", async () => {
    (getSession as jest.Mock).mockResolvedValue(null);
    const context = { req: {}, res: {}, query: {} };
    const response = await getServerSideProps(context as any);
    expect(response).toEqual({
      redirect: {
        destination: "/",
        permanent: false,
      },
    });
  });

  test("Renders dashboard with 3 graphs and user's list table", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      user: { name: "Test User" },
    });
    mockedAxios.get.mockImplementation((url) => {
      if (url === "/api/age-distribution")
        return Promise.resolve({ data: { 18: 10, 25: 15 } });
      if (url === "/api/users-by-country")
        return Promise.resolve({ data: { USA: 5, Canada: 7 } });
      if (url === "/api/premium-users")
        return Promise.resolve({ data: { premium: 12, free: 88 } });
      return Promise.reject(new Error("Unexpected API call"));
    });
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider
          session={{
            user: { name: "Test User", id: '23' },
            expires: "9999-12-31T23:59:59.999Z",
          }}
        >
          <Dashboard />
        </SessionProvider>
      </ThemeProvider>
    );
    await waitFor(() =>
      expect(
        screen.getByText("Age Distribution of your Users")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("Country Distribution of your Users")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("Premium Distribution of your Users")
      ).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.getByText("Users")).toBeInTheDocument());
  });

  test("Allows filtering users by name/email", async () => {
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider
          session={{
            user: { name: "Test User", id: '23' },
            expires: "9999-12-31T23:59:59.999Z",
          }}
        >
          <Dashboard />
        </SessionProvider>
      </ThemeProvider>
    );
    const searchInput = screen.getByPlaceholderText("Name or email") as HTMLInputElement;
    await userEvent.type(searchInput, "Alice");
    expect(searchInput).toHaveValue("Alice");
  });
});
