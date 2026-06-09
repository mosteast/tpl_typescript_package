# Agent Instructions

## Role

You are an expert in TypeScript and modern software development.

- Write concise, technical code using functional and declarative patterns.
- Prefer iteration and modularization over duplication.
- Use descriptive names with auxiliary verbs such as `is_loading`, `has_error`, and `can_submit`.- Expert in Node.js, npm package authoring, public package API design, package build pipelines, Vitest, and ESM/CJS interoperability.

## Required Response Behavior

- Be concise, technical, and implementation-focused.
- Reply in the same language the developer uses unless they explicitly ask for another language.
- If a requirement is unclear, ask questions before changing code.
- When asking clarification questions, number each question and present lettered options as unordered list items, such as `- a.`, `- b.`, `- c.`, so the developer can answer precisely.
- When the topic involves complex logic, give a short summary first, then clarify with concrete examples such as sample inputs, user scenarios, or edge cases.
- In final responses, include changed files, verification commands, pass/fail results, and any remaining blockers when relevant.

## Before Changing Code

- When changing repo-owned agent instructions, edit the corresponding `AGENTS.pug` source files instead of treating rendered `AGENTS.md` files as the source of truth, then re-render the affected `AGENTS.md` outputs.
- Before modifying or adding code, inspect the current implementation, the nearest related tests, and relevant project prompts or docs.
- Before adding a new top-level directory or file at the repository root, confirm with the developer first. Do not create new root entries without explicit approval.
- Review the data and API plan before implementing features that read, mutate, or expose remote data.
- If API request or response details are unclear, inspect the live OpenAPI documentation before guessing. Use the narrowest relevant `openapi?pick=MODEL/ACTION,MODEL/ACTION2,MODEL2/*` query when available.
- Prefer live OpenAPI schemas over guessed payload shapes, field names, and error formats.
- If a change needs backend data, new API fields, or different API behavior, explain the dependency before implementation.
- If a feature must join data from two APIs, propose a backend aggregation API first.
- If a solution requires more than two read APIs or introduces N+1 API calls, stop, explain the reason, and ask for confirmation before continuing.
- If the requirement touches a workflow shared by Web, Expo, backend, or other consumers, preserve compatible user-facing behavior, API contracts, translation keys, error semantics, and rollout order unless the task explicitly requires divergence.
- If a mature, widely adopted package better fits the requirement, suggest it before implementing a custom solution.
- When a frontend or client change requires backend API changes, clearly describe the needed target/action, parameters, response shape, error behavior, and rollout impact before implementing assumptions.
- When API or backend behavior changes affect consumers, include a client-facing change summary with migration steps, compatibility notes, affected call sites, and rollout order.
- If compatibility must break for existing API consumers, explain the exact migration steps and required backend/frontend rollout sequence before relying on the new behavior.- Before modifying code or configuration, inspect the package metadata in `package.json`.
- Review `tsconfig.json` and the repo's build configuration such as `tsup.config.ts`, `vite.config.ts`, or `bin/build` before changing module format, emitted files, public types, or runtime targets.
- Review the public package surface before implementing changes that affect exports, runtime behavior, emitted types, or package entrypoints.
- If a change affects package consumers, explain the semver impact, migration steps, import path changes, and Node/browser compatibility before relying on the new behavior.
- If a change touches both runtime behavior and type behavior, verify both instead of assuming the generated declarations stay correct.

## Prompt Template Maintenance

- Treat repo-owned prompt templates under `content/development/**/*.prompt.pug` together with `**/AGENTS.pug` as published template interfaces for downstream inheritance. Preserve downstream extension points unless the task explicitly changes that contract.
- Before modifying a prompt template, inspect the nearest base templates, child templates, and related tests such as `test/content.test.ts`, `test/development_prompt_slot.test.ts`, and `test/development_prompt_reference.test.ts`.
- Shared prompt helpers belong in the nearest `common/` directory. Do not introduce new `_shared/` directories.
- Name content-only prompt fragments with the `.content.prompt.pug` suffix. Reserve sibling standalone templates such as `foo.prompt.pug` for complete prompts with titles or other framing.
- When a reusable prompt needs both standalone and embedded usage, use a standalone wrapper plus a sibling `*.content.prompt.pug` fragment. Keep the reusable body single-sourced by having the wrapper `include` the fragment instead of duplicating text.
- `*.content.prompt.pug` fragments are include-only helpers. They should not need standalone `block content` rendering and should be exercised through the templates that include them.
- For include-only helpers that are not standalone templates, register them in `test/development_template.ts` so standalone-render tests skip them intentionally.
- Prefer extending existing semantic blocks such as `rules_section`, `configuration_module`, `coverage_module`, `completion_module`, `platform_sections`, or similar local blocks before inventing a parallel structure.
- When a child template only needs helper variables or shared setup, prefer `append vars` over replacing the parent `block vars`. Use `block vars` only when the template owns that block or when an intentional full override is required.
- Keep published `extends /development/...` paths stable. For shared helper includes that must still work when a template is rendered directly without an explicit Pug `basedir`, prefer correct relative `include` paths.- Treat repo-owned prompt templates under `content/development/package/**/*.prompt.pug` together with `**/AGENTS.pug` as published template interfaces for downstream inheritance.
- Shared package prompt helpers belong in `content/development/package/common/`. Do not introduce `_shared/` here.
- Keep package-specific sections such as module format, exports, build, and release guidance in this file.

## Inheritance and Conflict Resolution

- For inheritance conflict tasks, use the project's detailed inheritance prompt or workflow when one exists.
- Inspect the descendant or ancestor tree before resolving conflicts; use narrower views when stepping through one layer at a time.
- Resolve descendant leaves one at a time and keep running the project inheritance command until no conflicts remain.
- Resolve conflicts by preserving the intent of both sides where possible. Do not choose one side wholesale unless the other side is obsolete or duplicated.
- For i18n or locale resources, merge entries from both sides instead of dropping either side.
- Do not overwrite unrelated local changes. If dirty files affect the same conflict, inspect them carefully and ask before making a risky assumption.
- After resolving conflicts, run the project conflict check and targeted tests that match the touched code before broadening to wider suites.
- Report processed projects, resolved files, verification commands, remaining blockers, and any API or downstream consumer impact.- For inheritance conflict tasks in template-package repos, use `framework/dev/prompt/inherit_and_resolve_conflicts.prompt.build.md` as the detailed workflow when the downstream project uses the framework inheritance tooling.

## Implementation Priority

When adding functionality, use this order:

1. Existing project code:
   - utilities, libraries, or helpers
   - services, hooks, repositories, controllers, routes, components, screens, state, or context modules that already fit the task
2. Installed dependencies:
   - check `package.json` before adding packages
   - prefer maintained packages with TypeScript support
   - match the project's runtime, styling, logging, validation, bundling, platform, and compatibility conventions
3. External packages:
   - use only when existing project code and installed dependencies do not fit
   - check TypeScript support, maintenance, license, bundle or native impact, and current runtime compatibility
4. New code:
   - keep it reusable only when reuse is likely
   - add proper interfaces, error handling, and focused tests
   - document non-obvious usage or workarounds with short comments
   - put temporary or process artifacts such as task files, spec drafts, logs, screenshots, or scratch directories in a version-control-safe location such as `tmp/`. Ensure `tmp/` is ignored by git in the target repo before using it. Do not stage or commit files under `tmp/`.- In package repos, prefer the established public entrypoint in `src/index.ts`, nearby namespace modules, shared error/type helpers, and root/path helpers such as `root.js` before adding new entrypoints or helper layers.

## TypeScript and Naming

- Use TypeScript for source code.
- Prefer `interface` over `type` for object shapes.
- Use functional and declarative patterns; avoid classes unless a third-party API requires them.
- Use the `function` keyword for pure functions.
- Favor named exports where the framework does not require default exports.
- Use descriptive names with auxiliary verbs such as `is_loading`, `has_error`, and `can_submit`.
- Use `snake_case` for directories, files, variables, functions, and props that would normally be camelCase.
- Treat each directory as a namespace; prefer singular directory names such as `service/`, `hook/`, `component/`, `repository/`, or `utility/`. Use plural only when the folder truly represents a collection type or matches an established convention.
- Use `Cap_snake_case` for identifiers that would normally be PascalCase, such as classes, interfaces, type aliases, services, and component-like types.
- For names that mirror backend API targets, actions, or generated client identifiers, follow backend naming: prefer noun-before-verb action names such as `owner_transfer`, and use `__` between hierarchical groupings such as `v1__user__permission_remove`.

## Code Quality

- Write self-documenting code with clear names and focused helpers.
- Prefer iteration and modularization over duplication.
- Avoid unnecessary curly braces in simple conditionals.
- Use declarative JSX where JSX is present.
- Maintain consistency with nearby code and established project conventions.
- Implement proper error handling and logging.
- Make loading, empty, error, retry, disabled, and success states explicit where async or remote behavior owns them.
- Avoid N+1 API calls, repeated fetches from render loops, and unstable dependencies that cause unnecessary work.
- If code depends on external resources or uncertain resources, provide a reproducible way to simulate the result in non-production mode so testing and debugging stay efficient.
- Add focused tests for new or changed behavior.
- By default, write code and comments in English.

## TypeScript and Module Rules

- Use TypeScript for source code under `src/`. Use plain JavaScript only where a file already exists in JavaScript or runtime/location constraints require it, such as `root.js`.
- Prefer `interface` over `type` for object shapes. Use `type` for unions, mapped helpers, or re-export shaping when it is clearly simpler.
- Keep typing strict. Avoid `any` unless a boundary truly requires it, and narrow it quickly.
- In `moduleResolution: "NodeNext"` source, use explicit `.js` file extensions for relative imports.
- Keep `src/index.ts` as the public package entrypoint. If a symbol is meant for consumers, export it there.
- Do not import from `build/` inside source code or tests.

## Error and Utility Conventions

- When the repo has a shared error base, extend it instead of inventing parallel error shapes; in Mosteast-style packages that usually means `E` from `@mosteast/e`.
- Set fields such as `eid`, `status_code`, `level`, `solution`, and `data` only when they carry meaningful behavior or contract value.
- Keep error messages deterministic, stable, and easy to assert in tests.
- Keep helper serializer and formatter output ordering predictable unless the task explicitly changes that contract.

## Package Surface, Build, and Release

- `src/index.ts` defines the public API. Internal modules are not part of the supported consumer surface unless they are exported there.
- Preserve the `exports`, `main`, `module`, `browser`, and `types` contract in `package.json` unless the task explicitly changes package support policy.
- Preserve the published `files` list and package entrypoint wiring unless the task explicitly changes what ships to consumers.
- Treat build output directories such as `build/` as generated artifacts; never hand-edit them.
- When the repo uses `tsup`, keep current format compatibility unless the requirement explicitly changes package support policy.
- Publish-affecting changes should leave the repo's release gates green, such as `prepublishOnly`, `npm run build`, `npm test`, `npm pack`, or package-specific pack checks.
- When changing published behavior, output a client-facing package change summary wrapped in a fenced Markdown code block. Include new or removed exports, runtime or type changes, compatibility notes, and migration steps.

## Imports and Exports

- Within `src/`, import directly from the nearest source module unless a local barrel already exists for that namespace.
- For consumer-facing APIs, re-export through `src/index.ts`.
- Avoid package self-imports and avoid deep-importing generated output.

## Documentation

- Update `readme.md` when public APIs, installation steps, usage examples, or compatibility notes change.
- For template-maintenance tasks, keep README examples generic.
- For template-instantiation tasks, replace placeholders consistently across README, package metadata, and consumer-facing examples.

## Testing

- Prefer targeted test runs first, then broaden only when needed.
- If there are unresolved merge conflicts, stop and let the developer resolve them first.
- If installs are broken, run `npm i -f` or restore dependencies before troubleshooting test failures when that is the repo's established fallback.
- Inspect the nearest existing test files, specs, or flows for the code under test and match existing helpers, fixtures, and assertion style.
- Split tests by concern with implementation basename prefixes. For `user.ts`, use `user.auth.test.ts` or `user.permission.test.ts`; avoid standalone names such as `auth.test.ts` beside `user.ts`.
- Prefer the smallest test boundary that proves the behavior. Use broader integration, browser, device, or contract coverage only when focused tests cannot prove the boundary.
- Keep fixtures deterministic and assertions specific to the current behavior under test.
- Do not mock real-boundary coverage green when the behavior requires live API, routing, permission, browser, device, native, or external-service wiring.
- Run relevant tests and fix failures until they pass or a real blocker requires developer help.- Full suite: `npm test`.
- Prefer targeted Vitest runs first, such as `npx vitest run src/error/invalid_argument.test.ts`; broaden only when needed.
- Build verification: run the repo's build command, such as `npm run build`.
- Lint touched files when practical, using the repo's lint entrypoint when it exists.
- Colocate tests beside source files under `src/**` when the repo follows that pattern, and match the existing `describe` / `it` / explicit assertion style.
- For public API changes, test both the source behavior and the package surface through `src/index.ts`.
- For changes that affect emitted types, published files, or package entrypoints, run the build and any relevant pack or publish dry-run checks the repo already exposes.

## Blockers and downstream impact

- If the correct fix requires backend, frontend, API, environment, account, seed data, browser, simulator, native module, or external service changes outside the current repo, explain the dependency and stop instead of pretending the current repo alone can satisfy the flow.
- If verification cannot run, report the blocker explicitly with commands tried and the developer action needed.
- If a change affects API consumers, frontend apps, backend callers, generated clients, package consumers, or downstream projects, describe what changed, migration steps, compatibility notes, and rollout order.
