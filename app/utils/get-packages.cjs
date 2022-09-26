const path = require("path");
const fs = require("fs");

const getPackages = () => {
  try {
    const packages = fs.readdirSync(path.join(__dirname, "../../packages"));
    return {
      data: packages.map((pkg) => {
        const data = fs.readFileSync(
          path.join(__dirname, "../../packages", pkg, "config.json"),
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
