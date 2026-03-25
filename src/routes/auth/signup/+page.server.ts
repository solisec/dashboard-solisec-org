import { fail, redirect } from "@sveltejs/kit";
import { APIError } from "better-auth/api";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    throw redirect(303, "/");
  }

  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const nameValue = formData.get("name");
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");
    const confirmPasswordValue = formData.get("confirmPassword");
    const name = typeof nameValue === "string" ? nameValue.trim() : "";
    const email = typeof emailValue === "string" ? emailValue.trim() : "";
    const password = typeof passwordValue === "string" ? passwordValue : "";
    const confirmPassword = typeof confirmPasswordValue === "string" ? confirmPasswordValue : "";

    const values = { name, email };

    if (!name || !email || !password || !confirmPassword) {
      return fail(400, {
        message: "Fill in every field.",
        values,
      });
    }

    if (password !== confirmPassword) {
      return fail(400, {
        message: "Passwords do not match.",
        values,
      });
    }

    try {
      await event.locals.auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        return fail(400, {
          message: error.message || "Sign up failed.",
          values,
        });
      }

      return fail(500, {
        message: "Unexpected error during sign up.",
        values,
      });
    }

    throw redirect(303, "/auth/login?registered=1");
  },
};
