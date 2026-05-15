# Compass

## Purpose

Compass is the field-entity AI conversation surface — the primary AI interaction point in the product. It pulls context from whatever it's connected to, streams Claude responses, observes the Compass silence rule, and carries a FROZEN system prompt.

## Scope

MVP-binding.

## Behavior

Compass exists only as a field entity (a Compass window). Two distinct chrome primitives ship: the **dual-mode compass button** in the app header, which spawns a Compass window-entity, and the **global Compass Collaborator overlay** in the top-right, which attaches to a host surface. Both surface notifications — this is a redundant co-surfacing, not a hand-off. The compass-button popout routes notifications; the global Collaborator overlay also surfaces the notification stream (DC-10's carry-history role is one of two co-surfacings). Visual placement of the global Collaborator overlay is deferred to the aesthetic pass.

Compass responses stream during generation, with a blank-state spinner while streaming. Compass observes the silence rule: keep the user message, but suppress the assistant-side message entirely when Compass intentionally doesn't reply (e.g., greetings that shouldn't render).

**Three-part read posture** (Compass's conversational behavior, expressed in v2 terms):

1. **Silent awareness.** Points admitted to the margin (per universal-read's margin Requirement) inform Compass's read without being voiced unless the user asks. Compass does NOT recite the margin; it calibrates against its absence.
2. **On-demand detail pull.** When the user asks about a referenced point, Compass fires a Pass-2 semantic read at depth ≥ 1 for that point.
3. **Connections read live entity content.** Default depth = hop 1. Compass reads the trigger location's direct neighbors live; second-degree connections are not auto-traversed.

This governs Compass's conversational behavior; manifest mechanics live in `spec/specs/universal-read/spec.md`.

**System prompt freeze.** The Compass default prompt text is FROZEN against agent edits. The freeze defends the default prompt text Lukas authored — no agent rewrites, A/B tests, or "improves" it. It does NOT block user edits: users may override the Compass prompt via the bottom-half base of the split-signified shell, parallel to the four built-in tools; future user-facing edit surfaces are allowed.

The canonical text lives at `spec/specs/compass/system-prompt.md` — a verbatim artifact carrying both built-in modes (`SIGNIFIED` and `CLASSIC`), versioned by date-stamp plus content-hash. The code mirror at `packages/core/src/prompts/compass.ts` SHALL match that artifact verbatim. If the text legitimately needs to change, the change lands in `system-prompt.md` first; the code follows. The artifact is the canonical source; the code is the mirror.

What IS allowed for agents: reading the prompt to understand context, bug fixes to interpolation plumbing, streaming plumbing changes, incremental render changes, silence rule transport/UI changes, and Pass-1 manifest assembly changes (the DATA fed into the prompt can evolve).

User notes flow via the `signified` slot, never via system-prompt string concat. User Signified contents pass through the manifest's Signified slot; whether they manifest as system-prompt modification at Pass-2 evaluation is deferred per `spec/specs/universal-read/spec.md` — until that lands, user Signifieds enter Pass-2 prompt assembly as labeled Signified-slot blocks, not as system-prompt modifications.

Compass reads its own Signified via the `signified` slot — the same slot every other field entity uses, not a separate `compassNotes` path.

**Keyword-gating** fires as a short-circuit *before* Universal Read. Not every Compass prompt call hits the model; when the gate triggers, no manifest assembly runs.

**Compass Collaborator integration.** Every Compass window exposes a Compass Collaborator button hover-revealed on its front face (same compass-symbol used everywhere else on the interface). See `compass-collaborator/spec.md`.

**Compass-to-field binding.** Compass replies can bind to specific field entities.

**Auth and storage.**
- **Desktop (Tauri):** BYOK.
- **Web:** platform Anthropic API key for paid members. Web BYOK is DISABLED until BYOK encryption lands.

The Chat API enforces an origin allowlist. Storage mechanism, encryption, key-rotation cadence, allowlisted hosts, and non-allowed-origin responses are implementer territory — see `spec/olisa-implementer-notes.md` § auth-membership.

**Cross-session save.** The Save button for cross-session Compass memory does NOT ship for MVP. Full save/export is deferred post-MVP — see `signified-vision/openspec/specs/cross-session-memory/spec.md`.

## Invariants & Contracts

- Compass SHALL exist ONLY as a field entity. Two chrome primitives ship — the dual-mode compass button in the app header and the global Compass Collaborator overlay (top-right) — and both SHALL surface notifications (redundant co-surfacing, not hand-off).
- **Compass default prompt text SHALL NOT be edited by any agent.** Agent freeze defends the default text Lukas authored; user edits via the split-signified shell are out of scope of the freeze. The #38 system-prompt refinement sprint is killed.
- The canonical Compass system-prompt text SHALL live at `spec/specs/compass/system-prompt.md` (versioned by date-stamp + content-hash). The code mirror at `packages/core/src/prompts/compass.ts` SHALL match that artifact verbatim; when the two disagree, the artifact is the source of truth.
- User notes SHALL flow via the `signified` slot, never via system-prompt string concat. User-Signified→system-prompt promotion is research-owed.
- Compass responses SHALL stream during generation, with a blank-state spinner while streaming.
- Compass SHALL observe the silence rule (keep user message; suppress assistant-side message when Compass intentionally doesn't reply).
- Compass keyword-gating SHALL fire as a pre-Pass-1 short-circuit before Universal Read.
- Compass SHALL read its own Signified via the `signified` slot — NOT via a separate `compassNotes` path.
- Cross-session save SHALL NOT ship for MVP — deferred per `signified-vision/openspec/specs/cross-session-memory/spec.md`.
- Desktop = BYOK; web = platform key for paid members; web BYOK SHALL remain DISABLED until BYOK encryption lands.
- The Chat API SHALL enforce an origin allowlist.

## Cross-cap Dependencies

- `spec/specs/compass/system-prompt.md` — Canonical text of the default Compass system prompt (SIGNIFIED + CLASSIC modes). Verbatim artifact; code mirror lives at `packages/core/src/prompts/compass.ts`.
- `spec/specs/universal-read/spec.md` — Manifest assembly, scoring, margin, depth, termination; user-Signified→system-prompt rule deferral.
- `spec/specs/universal-read/grammar.md` — Per-primitive grammar artifact.
- `spec/specs/compass-collaborator/spec.md` — Compass Collaborator front-face button; search-parent capability on Compass-window hosts; global top-right notification overlay.
- `spec/specs/signify-window/spec.md` — Compass split-signified shell; signify-window slot inventory; FROZEN default base text scope.
