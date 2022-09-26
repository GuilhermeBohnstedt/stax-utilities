enum ValidChannels {
  "packages",
}

type ValidChannel = keyof typeof ValidChannels;

type ResponseObject<T> = {
  data: T;
  error?: string;
};

declare interface Window {
  api: {
    get: <T>(channel: ValidChannel) => Promise<ResponseObject<T>>;
  };
}
