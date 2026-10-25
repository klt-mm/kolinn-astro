# Deploy with GitHub to Cloudflare Workers

This Astro site is statically generated into `dist/` and uses Cloudflare
Workers Static Assets. It does not need an Astro SSR adapter, Worker API
handler, database binding, or application secret.

## Repository configuration

The repository includes `wrangler.jsonc`, which declares the Worker name and
serves Astro's `dist/` output. The package scripts are:

- `pnpm run build` — generate the static site.
- `pnpm run worker:dev` — serve the already-built `dist/` site through the
  local Workers runtime.
- `pnpm run worker:deploy` — upload the built static assets and Worker.
- `pnpm run check` and `pnpm run check:routes` — run the project checks.

The current Cloudflare build environment detects pnpm `9.10.0`. The repository
uses a single-document pnpm v9 lockfile and a workspace manifest containing
`packages: []`, both required by that runtime. Node.js must be `>=22.12.0` to
satisfy Wrangler. Do not regenerate the lockfile with a newer pnpm release if
it introduces additional YAML documents; verify it with pnpm `9.10.0`.

Build before local Worker preview or direct deployment:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run check:routes
pnpm run worker:dev
```

Open the local URL printed by Wrangler. Stop the preview, then deploy directly
only when Wrangler is authenticated to the intended Cloudflare account:

```sh
pnpm run worker:deploy
```

## Connect the GitHub repository

1. Push the project, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` to the GitHub
   repository's deployment branch (currently `main`).
2. Sign in to the intended Cloudflare account and open **Workers & Pages**.
3. Create a Worker application from a Git repository / connect the GitHub
   repository `klt-mm/kolinn-astro`. Authorize Cloudflare to access this
   repository if prompted.
4. Configure the production branch as `main`, the root directory as `.`, the
   build command as `pnpm run build`, and the deployment command as
   `pnpm run worker:deploy`. Ensure the build environment uses Node.js
   `>=22.12.0` and pnpm `9.10.0` (matching Cloudflare's detected toolchain).
5. Use the repository's pnpm lockfile for package installation. If the setup
   screen requests explicit commands, use `pnpm install --frozen-lockfile`
   followed by the build and deployment commands above.
6. Create the Worker as `kolinn-astro`, matching `wrangler.jsonc`. If Cloudflare
   reports that this name is already in use, change the `name` in that file to
   a globally unique Worker name and push the change before retrying.
7. Complete the initial build and inspect its deployment result and generated
   `workers.dev` URL.

Cloudflare's Git integration performs deployments when changes are pushed to
the configured branch. Connect a custom domain from the Worker settings after
the initial deployment, if desired. Do not commit API tokens or other
credentials to GitHub; repository secrets are only needed for a separate
GitHub Actions deployment workflow, which this setup does not use.

## Pull request previews

Enable preview deployments in the Cloudflare Git integration if previewing
branches or pull requests is desired. Confirm how preview deployments handle
the Worker name and domain in the Cloudflare dashboard before enabling them.
The main branch remains the production deployment.

## Verify the deployment

After the first deployment:

1. Open the `workers.dev` URL and verify `/`, `/blog`, `/projects/releases`,
   `/projects/help/documentations`, `/search`, and `/search-index.json`.
2. Verify a generated post/detail route and a nonexistent route (expected to
   show Astro's generated 404 page).
3. Confirm `/about` and `/contact` legacy redirect pages navigate to their
   `/info/` destinations.
4. Inspect response headers on HTML and static assets. Cloudflare may apply
   static header configuration differently from Astro preview; validate
   security headers and caching against the deployed response.
   The build generates CSP hashes for emitted inline bundles and Shiki styles
   into `dist/_headers`; verify that the deployed policy permits those exact
   hashes and Cloudflare Web Analytics without allowing arbitrary inline code.
5. Recheck navigation, search, dark/light theme, mobile layout, and reduced
   motion in a browser.

## Troubleshooting

- **No matching asset directory:** run `pnpm run build` and confirm `dist/`
  exists before `wrangler dev` or `wrangler deploy`.
- **Build cannot install dependencies:** ensure the GitHub repository contains
  the updated `pnpm-lock.yaml` and `pnpm-workspace.yaml`, uses Node.js
  `>=22.12.0`, and uses pnpm `9.10.0`. If pnpm reports `packages field
  missing or empty`, confirm that the root `pnpm-workspace.yaml` has
  `packages: []`. If it reports a broken lockfile, confirm that
  `pnpm-lock.yaml` contains a single YAML document and is generated from the
  committed manifests.
- **Worker name already exists:** select a unique name in `wrangler.jsonc` and
  keep the Cloudflare build target in sync.
- **Routes or 404 differ from local preview:** verify static asset HTML handling
  and missing-page behavior in `wrangler.jsonc`, then test the affected paths
  at the deployed URL.
- **Custom domain unavailable:** confirm that the domain is active in the same
  Cloudflare account and attach it in the Worker settings.
