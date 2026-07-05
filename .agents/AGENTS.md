# Project AI Rules

The following rules apply specifically to this project (`housing-with-agents`):

## Git Workflow & PR Automation
To maximize productivity and avoid merge conflicts, you must follow this strict workflow for every new feature or fix:
1. **Sync with Remote Main**: Before creating any new branch, always run `git checkout main` followed by `git pull origin main`. This ensures the local `main` branch includes the merge commits from previously closed PRs, preventing the "1 commit behind" issue.
2. **Create Branch**: Create the new feature branch (`git checkout -b <branch-name>`).
3. **Commit & Push**: After completing work, proactively `git add`, `git commit` (using conventional commits), and `git push -u origin <branch-name>`.
4. **Raise Pull Request**: Automatically raise a Pull Request against `main` using the GitHub CLI: `gh pr create --title "<Title>" --body "<Description>"`.
5. **Clean Workspace**: After merging PRs and switching back to `main`, ensure the workspace is kept completely clean by deleting temporary scratch files, Python caches (`__pycache__`), or dangling test scripts to avoid branch pollution.
6. Do not wait for the user to tell you to do these things. The human developer's only job is to review the code and approve the PR once CI/CD checks pass.
