import { vi } from "vite-plus/test";

type AuthMock = {
  api: {
    signInEmail: ReturnType<typeof vi.fn>;
    signUpEmail: ReturnType<typeof vi.fn>;
  };
};

type EventOptions = {
  formData?: Record<string, FormDataEntryValue>;
  auth?: AuthMock;
  user?: unknown;
  url?: string;
};

export const createAuthMock = (): AuthMock => ({
  api: {
    signInEmail: vi.fn(),
    signUpEmail: vi.fn(),
  },
});

export const createActionEvent = ({
  formData = {},
  auth = createAuthMock(),
  user,
  url = "http://localhost/auth/login",
}: EventOptions = {}) => {
  const data = new FormData();

  for (const [key, value] of Object.entries(formData)) {
    data.set(key, value);
  }

  return {
    locals: {
      auth,
      user,
    },
    request: {
      formData: vi.fn().mockResolvedValue(data),
    },
    url: new URL(url),
  };
};
