import electronLogger from "electron-log";

type LoggerOptions = {
  type: 'info' | 'error' | 'warn';
  title: string;
  completeMessage?: string;
};

const logger = (options: LoggerOptions) =>
  electronLogger[options.type](
    `Message: ${options.title}\n ${options.completeMessage}`, 
  );

export default logger;
