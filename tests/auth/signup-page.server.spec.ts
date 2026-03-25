import { APIError } from "better-auth/api";
import { describe, expect, it } from "vite-plus/test";
import { actions, load } from "../../src/routes/auth/signup/+page.server";
import { createActionEvent, createAuthMock } from "./test-helpers";

describe("auth signup page", () => {
  it("redirects authenticated users away from signup", async () => {
    await expect(
      load(
        createActionEvent({ user: { id: "user_1" }, url: "http://localhost/auth/signup" }) as never,
      ),
    ).rejects.toMatchObject({
      status: 303,
      location: "/",
    });
  });

  it("rejects incomplete form submissions", async () => {
    const auth = createAuthMock();
    const result = await actions.default(
      createActionEvent({
        auth,
        url: "http://localhost/auth/signup",
        formData: { name: "Karl", email: "karl@example.com" },
      }) as never,
    );

    expect(result).toMatchObject({
      status: 400,
      data: {
        message: "Fill in every field.",
        values: { name: "Karl", email: "karl@example.com" },
      },
    });
    expect(auth.api.signUpEmail).not.toHaveBeenCalled();
  });

  it("rejects mismatched passwords", async () => {
    const auth = createAuthMock();
    const result = await actions.default(
      createActionEvent({
        auth,
        url: "http://localhost/auth/signup",
        formData: {
          name: "Karl",
          email: "karl@example.com",
          password: "abc12345",
          confirmPassword: "xyz98765",
        },
      }) as never,
    );

    expect(result).toMatchObject({
      status: 400,
      data: {
        message: "Passwords do not match.",
        values: { name: "Karl", email: "karl@example.com" },
      },
    });
    expect(auth.api.signUpEmail).not.toHaveBeenCalled();
  });

  it("submits trimmed signup values to Better Auth", async () => {
    const auth = createAuthMock();

    await expect(
      actions.default(
        createActionEvent({
          auth,
          url: "http://localhost/auth/signup",
          formData: {
            name: "  Karl  ",
            email: "  karl@example.com  ",
            password: "abc12345",
            confirmPassword: "abc12345",
          },
        }) as never,
      ),
    ).rejects.toMatchObject({ status: 303, location: "/auth/login?registered=1" });

    expect(auth.api.signUpEmail).toHaveBeenCalledWith({
      body: {
        name: "Karl",
        email: "karl@example.com",
        password: "abc12345",
      },
    });
  });

  it("surfaces Better Auth signup errors", async () => {
    const auth = createAuthMock();
    auth.api.signUpEmail.mockRejectedValue(
      new APIError("BAD_REQUEST", { message: "User already exists" }),
    );

    const result = await actions.default(
      createActionEvent({
        auth,
        url: "http://localhost/auth/signup",
        formData: {
          name: "Karl",
          email: "karl@example.com",
          password: "abc12345",
          confirmPassword: "abc12345",
        },
      }) as never,
    );

    expect(result).toMatchObject({
      status: 400,
      data: {
        message: "User already exists",
        values: { name: "Karl", email: "karl@example.com" },
      },
    });
  });
});
