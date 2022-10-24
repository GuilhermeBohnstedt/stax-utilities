import { join } from "path";

const getPluginsPath = () => {
  console.log("node_ENV: ", process.env.NODE_ENV)
  const path =
    process.env.NODE_ENV === "development" ? "../../plugins" : "../plugins";

  return join(__dirname, path);
};

export default getPluginsPath;
