# AI Coding Session Recorder

Record prompt-driven coding work into a clean `DEVLOG.md` so GitHub visitors can understand what changed and why.

## Usage

```bash
node ./bin/session-recorder.js --title "Add export flow" --prompt "Build CSV export" --notes "Tests pass locally"
```

The tool captures branch, git status, diff stats, prompt, and notes. It is intentionally small and works without dependencies.

## Suggested Workflow

Run the recorder after each meaningful AI-assisted change. Commit the resulting `DEVLOG.md` when it helps reviewers understand the decision trail.
