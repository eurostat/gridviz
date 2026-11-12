# Releases

- Every release keeps all previous implementations working. New behaviour is opt-in with defaults unchanged, and no API is removed unless the user agrees.
- Put everything known to belong in a release into one version. Do not plan follow-up releases by default: publishing is the user's manual step. If a split seems useful, say what extra publishes it costs and let the user decide.
- New public API is a minor version. Published versions cannot be changed.
- Before calling a release ready, run `npm test`, `test:compat`, `test:browser` and `test:gpu` (see [testing.md](testing.md)), and say plainly what they do not cover.
- Before staging, read `git status`: other sessions can have uncommitted work in this folder. Use a separate `git worktree` for long work, and stage files by name.
- Update `docs/changelog.md` and `docs/reference.md` in the same change. Release sections go newest first; do not leave a "Next version" heading behind.
- `dist/` is committed: run `npm run build` before a release. Most examples load `dist/gridviz.js`, so the examples site shows whatever was last built there.
- The user runs `npm publish`, which runs `npm audit` and `npm test` first and stops if either fails. Pushing and opening PRs on `eurostat` repos can also need the user. Create a GitHub release documenting the changes after publishing.
- Never credit an AI in commits, PRs, releases or committed files.
- Work can sit uncommitted in a `git worktree` (`git worktree list`) and be ticked in the user's untracked to-do list while absent from `master`. A to-do item is done only once it is on `master` and pushed.
- The package's default export is `src/index.js`, so bundlers use the sources, not `dist`.
- Do not use `npm run format` for a change: with no `.prettierignore`, it rewrites the whole repo, `dist` included. Use `npx prettier --write <files>`.
- Do not use `npm run start` as a build step: it is a webpack watcher that never exits.
