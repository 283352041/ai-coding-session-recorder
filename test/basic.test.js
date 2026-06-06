import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
test("writes a devlog", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "session-recorder-"));
  execFileSync(process.execPath, [path.resolve("bin/session-recorder.js"), "--out", path.join(dir, "DEVLOG.md"), "--title", "Test"], { cwd: process.cwd() });
  assert.match(fs.readFileSync(path.join(dir, "DEVLOG.md"), "utf8"), /AI coding session|Test/);
});