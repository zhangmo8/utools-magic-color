## Quick context guide (for Copilot / automation assistants)

Purpose: help an automated assistant quickly understand the repository layout, key files, how to run and build the project, common edit targets, and safety constraints so it can make repeatable, safe changes and provide patches.

---

### One-line summary

This is a small Vite + Vue (TypeScript) frontend project built as a uTools plugin. It uses `pnpm` for dependency management. The plugin entry points are `public/plugin.json` and `index.html`. Preload scripts live under `public/preload/`.

### Important files (root level)

- `package.json` — scripts and dependencies (use `pnpm` by default)
- `vite.config.ts` — Vite configuration and plugins
- `public/plugin.json` — uTools plugin metadata (important: `features` -> `regex` entries live here)
- `index.html` — web app entry
- `src/` — source code; primary files:
  - `src/main.ts` — app bootstrap
  - `src/App.vue` — main Vue component
  - `src/lib/`, `src/components/` — helper libs and components

### Run / build (common commands)

Run in a `zsh` shell:

```bash
pnpm install
pnpm dev    # start dev server (Vite)
pnpm build  # build for production
```

This repository expects `pnpm`; do not replace with global `npm` or `yarn` unless instructed.

### Key edit targets and conventions

- Plugin metadata: `public/plugin.json` — when editing `features`, `regex`, or `development.main`, be careful with JSON escaping. If a regex is stored as a JSON string, backslashes must be escaped (double-escaped in file). After changes, suggest the user verify plugin loading in uTools.
- Styles: `style.css` at repository root is referenced by the app.
- Preload scripts: `public/preload/*.js` affect host-plugin communication; treat changes here as higher risk.
- Dependencies: use `pnpm install`. For lockfile or version issues, prefer fixing `pnpm-lock.yaml` and reinstalling rather than ad-hoc type ignores.

### Dependencies (important packages)

List of notable dependencies found in `package.json` and guidance for each:

- `vue` — core framework. All components and composition API rely on this. Avoid changing major versions without testing.
- `vue-router` — client-side routing (we added router files). Ensure router is installed (`pnpm add vue-router`) and used via `createRouter`.
- `tailwindcss` & `@tailwindcss/vite` — utility-first CSS framework and Vite integration. When modifying styles or classes, ensure `tailwind.config.js` and PostCSS setup remain compatible. For production builds, ensure purge/content paths include `src/**/*.vue`.
- `@vueuse/core` — common composition utilities. Useful for small reactive helpers; prefer using these utilities rather than reimplementing common patterns.
- `magic-color` — color utilities (likely core to this project). Be cautious when upgrading — color parsing/matching behavior can change.
- `lucide-vue-next`, `@iconify/vue`, `@iconify-json/radix-icons` — icon libraries used by UI; adding or replacing icons may require installing new packages.
- `class-variance-authority`, `clsx`, `tailwind-merge` — utility libs for combining class names. When changing component class composition, prefer using these utilities to avoid style conflicts.
- `tw-animate-css` — animation helpers; check for global CSS imports.
- `vite`, `@vitejs/plugin-vue`, `vite` plugins — build tooling. Type mismatches between plugin versions can cause the `Plugin` type errors; if you see type conflicts, ensure `pnpm-lock.yaml` is up to date and consider aligning plugin versions.

Optional / possibly present UI toolkit notes:

- `shadcn-vue` (not found in package.json above) — if used, it provides component primitives and patterns. If you plan to use it, install and add notes here. When integrating, prefer following the shadcn-vue docs for theme/styles and slot usage.

Guidance for AI assistants when editing dependencies:

- Always update `package.json` via `pnpm add` / `pnpm remove` and avoid editing `pnpm-lock.yaml` manually.
- After changing dependencies, run `pnpm install` and a quick `pnpm build` or `pnpm dev` smoke test.
- If encountering Vite plugin type conflicts, report the failing type message and recommend running a clean install (`rm -rf node_modules pnpm-lock.yaml && pnpm install`) before making further changes.

### Minimal edit contract (recommended)

- Input: exact file path to change (e.g. `public/plugin.json`) and a short description of intent (e.g. "replace regex to match color formats").
- Output: a minimal `apply_patch` style patch that modifies only the required file(s). Where applicable, include quick smoke tests or examples to verify behavior.
- Failure modes to watch for: JSON syntax errors, TypeScript type conflicts, Vite plugin type mismatches. Avoid blanket `// @ts-expect-error` unless documented with rationale in the patch.

### Common edge cases / checklist

- JSON-embedded regex must keep proper escaping. Verify by pasting the string into a JSON validator or by programmatically parsing it.
- Vite plugin type conflicts often indicate duplicate or incompatible dependency versions; recommend `pnpm install` or removing `node_modules` + `pnpm install` and ensuring Vite versions align.
- Color regex: prefer an expression that covers `#rgb`, `#rrggbb`, `#rrggbbaa`, `0x...`, `rgb(...)`, `rgba(...)` and optionally `hsl(...)`. Provide test examples for acceptance and rejection.

### Suggested quick search keywords

- Filenames: `plugin.json`, `App.vue`, `main.ts`, `vite.config.ts`, `preload/services.js`
- JSON keys: `features`, `regex`, `development`
- Code symbols: `defineConfig`, `createApp`, `vue()`

### Example request template for Copilot

When asking Copilot to modify files, provide a minimal structured request:

- Target file path: `public/plugin.json`
- Intent: e.g. "Replace `features[1].cmds[0].match` with a regex matching multiple color formats."
- Validation: ask for 3 positive and 3 negative example strings to validate the regex (e.g. `#fff`, `rgba(255,0,0,0.5)` should match; `notacolor` should not).

Desired response from Copilot (ideal):

- An `apply_patch` patch that edits `public/plugin.json` only.
- A short smoke test checklist or a few example strings to verify the new regex in practice.

### Safety and side-effects

- Never automatically commit secrets, API keys, or private credentials.
- Changes to `public/preload` can affect runtime communication with the host; flag those edits as higher risk and ask for user confirmation.

---

If you want, I can:

- provide a tested, stricter color-matching regex and embed it into `public/plugin.json`,
- add a small Node.js test script under `scripts/` that validates the regex against example strings,
- or run a quick smoke test locally (requires `pnpm install` in the environment).
