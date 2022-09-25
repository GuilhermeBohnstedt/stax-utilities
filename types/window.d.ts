enum ValidChannels {
  "packages",
}

type ValidChannel = keyof typeof ValidChannels;

declare interface Window {
  api: {
    send: (
      channel: ValidChannel,
      data: Record<string, any> | Array<string | number>
    ) => void;
    receive: (
      channel: ValidChannel,
      fn: (data: any) => void
    ) => void;
  };
}
