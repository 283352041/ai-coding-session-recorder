#!/usr/bin/env node
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log("Usage: session-recorder [--title text] [--prompt text] [--notes text] [--out DEVLOG.md]");
  process.exit(0);
}
function value(flag, fallback = "") {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
function git(cmd) {
  try { return execFileSync("git", cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return ""; }
}
const out = value("--out", "DEVLOG.md");
const title = value("--title", "AI coding session");
const prompt = value("--prompt", "");
const notes = value("--notes", "");
const status = git(["status", "--short"]);
const diff = git(["diff", "--stat"]);
const branch = git(["branch", "--show-current"]) || "unknown";
const entry = [
  `## ${new Date().toISOString()} - ${title}`,
  "",
  `Branch: \`${branch}\``,
  prompt ? `Prompt: ${prompt}` : "",
  notes ? `Notes: ${notes}` : "",
  "",
  "### Git Status",
  status ? `\`\`\`text\n${status}\n\`\`\`` : "No working tree changes detected.",
  "",
  "### Diff Stat",
  diff ? `\`\`\`text\n${diff}\n\`\`\`` : "No diff stat available.",
  ""
].filter(Boolean).join("\n");
fs.appendFileSync(out, entry + "\n", "utf8");
console.log(`Wrote ${out}`);
