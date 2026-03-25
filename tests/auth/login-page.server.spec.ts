import { APIError } from "better-auth/api";
import { describe, expect, it } from "vite-plus/test";
import { actions, load } from "../../src/routes/auth/login/+page.server";
import { createActionEvent, createAuthMock } from "./test-helpers";

describe("auth login page", () => {
  it("returns a registered flag from the URL", async () => {
    const result = await load(
      createActionEvent({ url: "http://localhost/auth/login?registered=1" }) as never,
    );

    expect(result).toEqual({ registered: true });
  });

  it("redirects authenticated users away from login", async () => {
    await expect(
      load(createActionEvent({ user: { id: "user_1" } }) as never),
    ).rejects.toMatchObject({
      status: 303,
      location: "/",
    });
  });

  it("rejects empty credentials", async () => {
    const auth = createAuthMock();
    const result = await actions.default(createActionEvent({ auth }) as never);

    expect(result).toMatchObject({
      status: 400,
      data: {
        message: "Enter your email and password.",
        values: { email: "" },
      },
    });
    expect(auth.api.signInEmail).not.toHaveBeenCalled();
  });

  it("submits trimmed login credentials to Better Auth", async () => {
    const auth = createAuthMock();

    await expect(
      actions.default(
        createActionEvent({
          auth,
          formData: {
            email: "  user@example.com  ",
            password: "hunter2",
          },
        }) as never,
      ),
    ).rejects.toMatchObject({ status: 303, location: "/" });

    expect(auth.api.signInEmail).toHaveBeenCalledWith({
      body: {
        email: "user@example.com",
        password: "hunter2",
      },
    });
  });

  it("surfaces Better Auth errors", async () => {
    const auth = createAuthMock();
    auth.api.signInEmail.mockRejectedValue(
      new APIError("BAD_REQUEST", { message: "Invalid credentials" }),
    );

    const result = await actions.default(
      createActionEvent({
        auth,
        formData: {
          email: "user@example.com",
          password: "wrong-password",
        },
      }) as never,
    );

    expect(result).toMatchObject({
      status: 400,
      data: {
        message: "Invalid credentials",
        values: { email: "user@example.com" },
      },
    });
  });
});
