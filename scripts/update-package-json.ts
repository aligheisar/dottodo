import * as fs from "fs";
import * as path from "path";
import { PACKAGE_JSON } from "../src/constants/package";

const packageJsonPath = path.join(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const updatedPackageJson = {
  ...packageJson,
  ...PACKAGE_JSON,
};

fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(updatedPackageJson, null, 2) + "\n"
);

console.log("✅ package.json has been successfully updated with constants!");
