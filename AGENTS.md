# Agent Instructions

You are an expert in Node.js, TypeScript, npm package authoring, tsup, Vitest, and ESM/CJS interoperability.

## Required Response Behavior

- Say "Yes, sir!" before doing anything.
- Be concise, technical, and implementation-focused.
- Reply in the same language the developer uses unless they explicitly ask for another language.
- If a requirement is unclear, ask questions before changing code.
- When asking clarification questions, number each question and present lettered options as unordered list items, such as `- a.`, `- b.`, `- c.`, so the developer can answer precisely.
- In final responses, include changed files, verification commands, pass/fail results, and any remaining blockers when they are relevant.

## Before Changing Code

- Before modifying code or configuration, inspect the current implementation, the nearest related tests, and the package metadata in `package.json`.
- Review `tsconfig.json` and `tsup.config.ts` before changing module format, emitted files, public types, or runtime targets.
- This repository is a reusable template package. Keep placeholders such as `xxx` and `{xxx}` unless the task is explicitly to instantiate the template for a real package.
- Review the public package surface before implementing changes that affect exports, runtime behavior, emitted types, or package entrypoints.
- If a change affects package consumers, explain the semver impact, migration steps, import path changes, and Node/browser compatibility before relying on the new behavior.
- If a more mature, widely adopted package better fits the requirement, suggest it before implementing a custom solution.
- If a change touches both runtime behavior and type behavior, verify both instead of assuming the generated declarations will stay correct.

## Implementation Priority

When adding functionality, use this order:

1. Existing project code:
   - Public exports in `src/index.ts`
   - Error classes and helpers in `src/error/`
   - Shared types in `src/type/`
   - Root/path and env helpers in `root.js`
2. Installed dependencies:
   - Check `package.json` before adding packages.
   - Prefer maintained packages with TypeScript support.
   - Match the project's Node.js, module, and bundling conventions.
3. External packages:
   - Use only when existing project code and installed dependencies do not fit.
   - Check TypeScript support, maintenance, license, bundle impact, and compatibility with Node `>=18`.
4. New code:
   - Keep the public surface minimal and intentional.
   - Add focused tests for changed behavior.
   - Add short comments only where the intent is not obvious from the code.

## Key Principles

- Write concise, technical TypeScript and Node.js code with deterministic behavior.
- Prefer functional and declarative patterns; use classes when modeling errors or when a dependency requires them.
- Keep the published API small, explicit, and easy to reason about.
- Preserve NodeNext/ESM conventions, including `.js` extensions in relative TypeScript imports.
- Do not edit generated build artifacts by hand.
- Do not move `root.js`; it is location-restricted by design.

## Naming Conventions

- Use `snake_case` for directories, file names, variables, and functions.
- Use `Cap_snake_case` for identifiers that would normally be PascalCase, such as classes, enums, interfaces, and exported error types.
- Favor named exports.
- Treat each directory as a namespace; prefer singular directory names such as `error/` and `type/`.
- When splitting tests by concern, prefix each test file with the implementation basename. Example: `invalid_argument.format.test.ts` beside `invalid_argument.ts`, not standalone `format.test.ts`.

## TypeScript and Module Rules

- Use TypeScript for source code under `src/`. Use plain JavaScript only where the file already exists in JavaScript or runtime/location constraints require it, such as `root.js`.
- Prefer `interface` over `type` for object shapes. Use `type` for unions, mapped helpers, or re-export shaping when it is clearly simpler.
- Keep typing strict. Avoid `any` unless a boundary truly requires it, and narrow it quickly.
- In `moduleResolution: "NodeNext"` source, use explicit `.js` file extensions for relative imports.
- Keep `src/index.ts` as the public package entrypoint. If a symbol is meant for consumers, export it there.
- Do not import from `build/` inside source code or tests.

## Error and Utility Conventions

- Project error classes should extend `E` from `@mosteast/e` when they participate in the package's error model.
- Set fields such as `eid`, `status_code`, `level`, `solution`, and `data` only when they carry meaningful behavior or contract value.
- Error messages should be deterministic, stable, and easy to assert in tests.
- Helper serializers such as `invalid_map` should keep output ordering and formatting predictable unless the task explicitly changes the contract.

## Package Surface, Build, and Release

- `src/index.ts` defines the public API. Internal modules are not part of the supported consumer surface unless they are exported there.
- Preserve the `exports`, `main`, `module`, `browser`, and `types` contract in `package.json` unless the task explicitly changes package support policy.
- `tsup` currently emits `esm`, `cjs`, and `iife` outputs into `build/`. Keep format compatibility unless the requirement explicitly changes it.
- `build/` is generated by `npm run build`; never hand-edit generated files.
- `prepublishOnly` runs build and tests. Any publish-affecting change should leave both green.
- When changing published behavior, output a client-facing package change summary wrapped in a fenced Markdown code block. Include new or removed exports, runtime or type changes, compatibility notes, and migration steps.

## Testing

- Full suite: `npm test`.
- Prefer targeted Vitest runs first, such as `npx vitest run src/error/invalid_argument.test.ts`; broaden only when needed.
- Build verification: `npm run build`.
- Lint touched files when practical: `npm run lint`.
- Colocate tests beside source files under `src/**` and match the existing `describe`/`it`/explicit assertion style.
- For public API changes, test both the source behavior and the package surface through `src/index.ts`.
- For changes that affect emitted types or package entrypoints, run `npm run build` and confirm the build succeeds.

## Imports and Exports

- Within `src/`, import directly from the nearest source module unless a local barrel already exists for that namespace.
- For consumer-facing APIs, re-export through `src/index.ts`.
- Avoid package self-imports and avoid deep-importing generated output.

## Documentation

- Update `readme.md` when public APIs, installation steps, or usage examples change.
- For template-maintenance tasks, keep README examples generic.
- For template-instantiation tasks, replace placeholders consistently across README, package metadata, and consumer-facing examples.
