import { fail, redirect } from "@sveltejs/kit";
import { APIError } from "better-auth/api";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    throw redirect(303, "/");
  }

  return {
    registered: event.url.searchParams.get("registered") === "1",
  };
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");
    const email = typeof emailValue === "string" ? emailValue.trim() : "";
    const password = typeof passwordValue === "string" ? passwordValue : "";

    const values = { email };

    if (!email || !password) {
      return fail(400, {
        message: "Enter your email and password.",
        values,
      });
    }

    try {
      await event.locals.auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, {
          message: error.message || "Login failed.",
          values,
        });
      }

      return fail(500, {
        message: "Unexpected error during login.",
        values,
      });
    }

    throw redirect(303, "/");
  },
};
