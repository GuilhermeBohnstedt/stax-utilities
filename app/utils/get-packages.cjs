const path = require("path");
const fs = require("fs");

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

module.exports = getPackages;
