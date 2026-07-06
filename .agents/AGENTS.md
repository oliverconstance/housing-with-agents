# Project AI Rules

The following rules apply specifically to this project (`housing-with-agents`):

## Git Workflow & PR Automation
To maximize productivity and avoid merge conflicts, you must follow this strict workflow for every **logically distinct feature or bug fix**:
1. **Define the Scope (No PR Spam)**: A single Pull Request should encapsulate a complete "logical task" (e.g., "Fix Fact Check UI" or "Build Policy Tracking"). Group all small file changes for that specific task into one branch. Do NOT raise 18 PRs for 18 minor changes if they are all part of the same task. However, if the user asks for two completely unrelated tasks in the same session, they MUST be separated into two different branches/PRs.
2. **Sync with Remote Main**: Before creating any new branch for a new task, always run `git checkout main` followed by `git pull origin main`. This ensures the local `main` branch includes the merge commits from previously closed PRs, preventing the "1 commit behind" issue.
3. **Create Branch**: Create the new feature branch (`git checkout -b <branch-name>`).
4. **Commit & Push**: After completing work on the task, proactively `git add`, `git commit` (using conventional commits), and `git push -u origin <branch-name>`.
5. **Raise Pull Request**: Automatically raise a Pull Request against `main` using the GitHub CLI: `gh pr create --title "<Title>" --body "<Description>"`.
6. **Clean Workspace**: After merging PRs and switching back to `main`, ensure the workspace is kept completely clean by deleting temporary scratch files, Python caches (`__pycache__`), or dangling test scripts to avoid branch pollution.
7. Do not wait for the user to tell you to do these things. The human developer's only job is to review the code and approve the PR once CI/CD checks pass.
