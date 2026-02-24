import { readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const IGNORE_DIRS = new Set([".git", ".github", "node_modules"]);

function collectJsFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        files.push(...collectJsFiles(join(dir, entry.name)));
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

const jsFiles = collectJsFiles(ROOT);
if (jsFiles.length === 0) {
  console.log("No JavaScript files found.");
  process.exit(0);
}

let failed = false;
for (const file of jsFiles) {
  const check = spawnSync(process.execPath, ["--check", file], {
    stdio: "inherit"
  });

  if (check.status !== 0) {
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log(`JavaScript syntax OK (${jsFiles.length} files).`);
