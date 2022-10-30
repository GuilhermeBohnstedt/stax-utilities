import type { WindowPlugin } from "models";

type ResponseObject<T> = {
  data: T;
  error?: string;
};

declare global {
  interface Window extends WindowPlugin {
    packages: {
      get: <T>() => Promise<ResponseObject<T>>;
    };
    plugins: {
      get: <T>() => Promise<ResponseObject<T>>;
    };
    theme: {
      change: <T>(
        theme: "light" | "dark" | "system"
      ) => Promise<ResponseObject<T>>;
    };
  }
  
}