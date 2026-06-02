# AGENTS.md

Guidance for agentic coding agents working in this repository (`ecuaciones-react`, aka `Superficie3D`).

## Stack

- React 19 + TypeScript (strict) + Zustand 5
- Rsbuild (Rspack) for bundling, dev server on port 3000
- Tailwind CSS v4 (via PostCSS) — utility classes only
- Plotly.js (`plotly.js-dist-min`) for 3D surface rendering
- Vitest + Testing Library + happy-dom for tests
- pnpm 9.15.9 as package manager (Node >= 18, ESM only)

## Commands

All commands use `pnpm`. Run from the repo root.

| Task | Command |
| --- | --- |
| Install deps | `pnpm install` |
| Dev server (http://localhost:3000) | `pnpm dev` |
| Production build (output to `dist/`) | `pnpm build` |
| Preview production build | `pnpm preview` |
| TypeScript check (no emit) | `pnpm typecheck` |
| Run full test suite once | `pnpm test` |
| Run tests in watch mode | `pnpm test:watch` |

### Running a single test

Vitest filters by file name. Examples:

```bash
# One file
pnpm test mathParser

# One file by path
pnpm test src/lib/__tests__/mathParser.test.ts

# Filter by test name
pnpm test -t "linspace"

# One file in watch mode
pnpm test:watch src/components/__tests__/ColorPicker.test.tsx
```

The default `pnpm test` runs once (`vitest run`). Add `-t <pattern>` to narrow by test name.

## Project layout

```
src/
  components/        UI components (one per file, PascalCase)
    __tests__/       Co-located Vitest + RTL tests
  lib/               Pure logic (mathParser.ts, examples.ts)
    __tests__/
  store/             Zustand store (single file: index.ts)
    __tests__/
  test/setup.ts      Vitest setup (jest-dom matchers + cleanup)
  global.d.ts        Type shims for plotly.js modules and CSS
  App.tsx            Root layout component
  main.tsx           Entry point, mounts <App /> into #root
  index.css          Tailwind entry + custom utility classes
```

The build asset path prefix is `/ecuaciones-react/` (see `rsbuild.config.mjs`).

## Imports & paths

- ESM only (`"type": "module"` in package.json).
- Path alias `@/*` -> `./src/*` is configured in both `tsconfig.json` and `vitest.config.ts`, but the existing code consistently uses **relative imports** (`../store`, `../lib/mathParser`). Prefer relative imports to match house style unless adding something new where an alias reads better.
- Order: external packages first, then blank line, then internal modules.
- Type-only imports use `import type` / `import { type Foo }` so unused-types lint stays clean:
  ```ts
  import { useCallback } from "react";
  import type { ChangeEvent, KeyboardEvent } from "react";
  ```
- React is not auto-imported in components (only `main.tsx` does `import React from "react"`); JSX uses the new transform (`"jsx": "react-jsx"`).

## TypeScript

- `strict: true`, plus `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noImplicitOverride`.
- Prefer `type` aliases for unions and shapes (see `AppState`, `Status`, `PlotData` in `src/store/index.ts`). `interface` is fine for plain object shapes when extending.
- Export domain types alongside their store/component (`export type ColorScale = ...`).
- Type-only file extensions: avoid `.ts/.tsx` in imports (`allowImportingTsExtensions: false`).
- Casts to `any` are tolerated only at plotly boundaries (see `PlotViewer.tsx`, `WorkspaceBar.tsx`) and are explicitly `// eslint-disable-next-line @typescript-eslint/no-explicit-any` annotated.

## Naming conventions

- Components: PascalCase named exports (`export function Header() { ... }`). Only `App` uses `export default`.
- Files match component name: `Header.tsx`, `ColorPicker.tsx`, `WorkspaceBar.tsx`.
- Hooks/state: `useStore` (single store), `useFoo` for any local hooks.
- Constants for static data: SCREAMING_SNAKE_CASE for true constants (`DEFAULT_RANGE`, `MATH_FUNCTIONS`); PascalCase tuples of objects (`COLORS`, `MODES`, `PRESETS`, `EXAMPLES`).
- Test files: `Foo.test.tsx` / `foo.test.ts`, co-located in `__tests__/` folders next to the code under test.
- UI strings and store messages are in **Spanish** (e.g. `"Ingresa una ecuacion."`, `"Generar superficie"`, `"Reset"`). Keep that consistent.

## Components

- Functional components only, no class components.
- Select narrowly from the store to avoid unnecessary re-renders:
  ```ts
  const renderSurface = useStore((s) => s.renderSurface);
  ```
- For non-reactive reads (event handlers, side effects), use `useStore.getState()`.
- Wrap event handlers passed to memoized children in `useCallback` when they capture store actions or local state.
- Use `type="button"` on every `<button>` to avoid accidental form submits.
- Tailwind utility classes for layout/colors. Custom classes like `section-panel` are defined in `src/index.css`.
- Use `aria-label` on icon-only / overlay buttons (e.g. the close button in `ExamplesSheet`).

## State (Zustand)

- Single `create<AppState>()((set, get) => ...)` in `src/store/index.ts`. Add new state and actions there, with matching types on `AppState`.
- Pure setters use `set({ ... })`; setters that need to re-render call `get().renderSurface()` (see `setResolution`, `setColorScale`, `setSurfaceMode`, `setDomainPreset`).
- Errors and status live in the store; `renderSurface` writes to `error` and `status` rather than throwing. Components read from `status` / `error`.
- `loadExample` and `resetDefaults` defer `renderSurface` via `setTimeout(..., 0)` to let `set` flush first.

## Math parser (`src/lib/mathParser.ts`)

- Pure functions, no React or store imports.
- Public API: `buildMathFunction(expr)`, `linspace(start, end, n)`, `generateZ(fn, xArr, yArr)`, plus the `MathFunction` and `ZMatrix` types.
- `generateZ` substitutes `null` for non-finite values (e.g. `log` of a negative); the store/Plotly layer handles them.
- Validation messages thrown from `buildMathFunction` are surfaced verbatim by the store; the test suite asserts on Spanish phrases like `Variable no permitida` and `sintaxis`. Keep those phrases stable when editing validation.

## Error handling

- Catch and convert unknown values to `Error` messages: `err instanceof Error ? err.message : String(err)`. See `renderSurface` in the store.
- `main.tsx` throws synchronously when `#root` is missing — fine because rsbuild always renders the HTML template.
- Do not let exceptions escape from store actions; translate them into `error` / `status` so the UI can show them.

## Testing

- Vitest globals are enabled (`globals: true`), but existing tests still `import { describe, it, expect, beforeEach } from "vitest"` — keep that style for consistency.
- `happy-dom` is the environment; setup at `src/test/setup.ts` adds `@testing-library/jest-dom/vitest` matchers and calls `cleanup()` after each test.
- Reset shared Zustand state in `beforeEach`:
  ```ts
  function resetStore() {
    useStore.setState(useStore.getInitialState(), true);
  }
  ```
- Prefer `userEvent.setup()` for clicks/typing; use `fireEvent` only when `userEvent` does not cover the case (range inputs, `blur`).
- Assert on user-visible behavior (rendered text, store state) rather than implementation details.

## CI / deploy

- `.github/workflows/deploy.yml` builds the site with `pnpm install --frozen-lockfile` and `pnpm run build` on push to `master` and deploys to GitHub Pages.
- Locally, `pnpm build` produces `dist/` with the `/ecuaciones-react/` asset prefix.

## House rules

- Do not add comments unless they explain a non-obvious decision; the existing code is mostly self-documenting.
- Do not introduce a new lint/format tool — none is configured. Match the existing two-space indentation, single quotes, and trailing commas in TS/TSX.
- Do not commit unless explicitly asked.
- When the user is on Windows, commands must be runnable from PowerShell/cmd; avoid Unix-only shell syntax in scripts.
