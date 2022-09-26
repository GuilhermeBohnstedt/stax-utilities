enum ValidChannels {
  "packages",
}

type ValidChannel = keyof typeof ValidChannels;

type ResponseObject = {
  data: any;
  error?: string;
};

declare interface Window {
  api: {
    get: (channel: ValidChannel) => Promise<ResponseObject>;
  };
}
