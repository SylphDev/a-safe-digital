import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useSession, signIn, SessionProvider } from "next-auth/react";
import { ThemeProvider } from "src/lib/theme"; // Import your custom ThemeProvider
import { CssBaseline } from "@mui/material";
import SignIn from "src/pages";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("SignIn Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders the page", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider>
          <SignIn />
        </SessionProvider>
      </ThemeProvider>
    );
    expect(
      screen.getByText("Welcome to A-Safe Technical Test")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("displays validation errors for empty fields", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider>
          <SignIn />
        </SessionProvider>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("Displays validation error for invalid email", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider>
          <SignIn />
        </SessionProvider>
      </ThemeProvider>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  test("Submits the form and handles successful login", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    (signIn as jest.Mock).mockResolvedValue({ ok: true, error: null });
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider>
          <SignIn />
        </SessionProvider>
      </ThemeProvider>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
      });
    });
  });

  test("Displays error message on failed login", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    (signIn as jest.Mock).mockResolvedValue({
      ok: false,
      error: "Invalid credentials",
    });
    render(
      <ThemeProvider>
        <CssBaseline />
        <SessionProvider>
          <SignIn />
        </SessionProvider>
      </ThemeProvider>
    );
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
