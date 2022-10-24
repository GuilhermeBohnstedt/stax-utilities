import { join } from "path";

const getPluginsPath = () => {
  const path = import.meta.env.DEV ? "../../plugins" : "../plugins";

  return join(__dirname, path);
};

export default getPluginsPath;
