import path from "path";
import fs from "fs";

const getPackages = () => {
  const baseDir = [__dirname, "../../packages"];
  try {
    const packages = fs.readdirSync(path.join(...baseDir));
    return {
      data: packages.map((pkg) => {
        const data = fs.readFileSync(
          path.join(...[...baseDir, pkg, "config.json"]),
          { encoding: "utf8", flag: "r" }
        );
        return JSON.parse(data);
      }),
    };
  } catch (e) {
    return { error: e.message };
  }
};

export default getPackages;
