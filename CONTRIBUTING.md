How changes land in this repo — authoritative.

# Safe-change rulebook

Extracted from `.claude/cold-plans/missions/04-safe-change-system/strategy.md` (Layer-1 research, 2026-04-16).

Not a product spec — repo policy for how changes land. Proposed after analysis of the last 50 commits identified 7 real failure modes (partial-landing of coupled changes, destructive git nuking sibling work, unapproved package installs, BE/FE drift, tests landing without their wire, baseline-noise hiding new errors).

## Commands forbidden in any agent / Layer-3 executor

Hard block — no exceptions.

- **Destructive git**: `reset --hard`, `push --force`, `push --force-with-lease`, `branch -D`, `clean -f`, `checkout --`, `commit --amend`, `rebase` (any form), `filter-branch`, `reflog expire --expire=now --all`
- **Verification skips**: `--no-verify`, `--no-gpg-sign`
- **Package changes**: `bun add`, `bun remove`, `bun upgrade`, `bun install` with lockfile changes, `npm i/install/uninstall`, `yarn add/remove`, `pnpm add/remove`
- **Platform mutations**: `vercel env add/remove`, `vercel link` to a different project, `supabase db reset`, `supabase db push`, direct writes to prod or preview env, edits to `.claude/settings.json` / `.claude/hooks/*` or CI configs unless the proposal names them
- **Broad staging**: `git add -A`, `git add .` — staging is file-by-file
- **Direct merges to main**: Lukas merges, executors don't

## Gate sequence (run in order before asking for commit approval)

| Gate | Command | Low | Med | High |
|---|---|---|---|---|
| G0 format/lint | `bunx biome check .` on touched files | ✓ | ✓ | ✓ |
| G1 typecheck | `bunx tsc -b code/apps/desktop/tsconfig.json --noEmit` | ✓ | ✓ | ✓ |
| G2 vitest | `bun run test` (scoped ok) | ✓ | ✓ | ✓ |
| G3 Playwright per wire | targeted `code/packages/app/e2e/functional/<spec>.spec.ts` | ✓ (any FE wire) | ✓ | ✓ |
| G4 Playwright PR set | `bun run test:pr` | — | ✓ | ✓ |
| G5 Playwright full + persona | full chromium + `e2e-persona-tests/` | — | — | ✓ (auth/RLS/primary flows) |
| G6 integration pair-check | BE endpoint + FE caller together on local dev | — | — | ✓ (coupled BE+FE) |

## Approval gates (three, in order)

1. **Proposal approval** — every change starts as a file in `.claude/intake/{fe,be}-proposals/`. No source touched until Lukas checks `approve as-is` or `approve with edits`.
2. **Pre-commit approval** — after gates pass, show diff summary + Playwright output, pause for Lukas.
3. **Pre-merge approval** — branch merge is Lukas's call. Executors never merge.

No batch approvals. One proposal, one approval. Direct-chat approval valid only for ≤5-line edits, and the chat quote goes in the commit body.

## Commit tag policy (already in use)

- `[D-N]` — implements a decisions-log entry, cites N
- `[MECH]` — mechanical/refactor, no behavior change (requires assertion)
- `[C-N]` — correction of a prior commit, cites sha
- `feat/fix/chore/test/docs/mockup(<scope>):` — routine
- **Forbidden**: `chore(wip)` in any form. If it feels like WIP, it isn't ready.

## Baseline-diff mechanism (shell helper, no new packages)

- On branch creation: snapshot tsc + biome + Playwright state to `.claude/verification-baselines/<branch>.json` (gitignored).
- Pre-commit: compare current run to baseline. Allowed: equal or fewer. Forbidden: any *new* failure vs baseline.
- Raw count may rise if baseline rises; diff may not.

## Undo path

- **Primary**: `git revert <sha>` — new commit, preserves history.
- **Secondary (pre-push only, Lukas only)**: `git reset --soft HEAD~1`. Never `--hard`.
- **Never**: force-push as undo. Forward-revert fixes a bad `main`.

## Status

Full strategy + pilot plan at `.claude/cold-plans/missions/04-safe-change-system/`. No `PROCESS.md` written yet (was Layer-2's job; Layer 2 never ran). Candidate for promotion to `CONTRIBUTING.md` at repo root if ratified.
