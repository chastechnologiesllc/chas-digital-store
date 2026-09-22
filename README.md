# chAs Technologies LLC Digital Store

A production-ready digital learning storefront for **chAs Technologies LLC**. The application presents practical classes and digital products focused on AI tools, digital opportunities, and modern online business systems, with support for checkout, order access, authentication, and payment-provider integrations.

## Features

- Responsive storefront with product and class catalogues.
- Product detail, checkout, payment-access, FAQ, contact, privacy, and terms pages.
- Paystack and Flutterwave payment flows, including initialize, verify, and webhook routes.
- Telegram delivery support for paid products and order notifications.
- Better Auth integration with an offline-friendly PGlite preview path.
- PostgreSQL-backed server data access through Kysely and `pg`.
- Local migration runner with an opt-in authentication schema.
- React Three Fiber hero experience and reusable Radix UI components.
- Vercel-compatible production build with security and cache headers.

## Technology

The application is built with React 19, TanStack Start and TanStack Router, Vite, TypeScript, Tailwind CSS, Radix UI, Kysely, PostgreSQL, PGlite, Better Auth, and Nitro/Vercel output.

## Requirements

- Node.js 22 or a current LTS release.
- npm 10 or newer.
- PostgreSQL for production database-backed operation. Local preview can use the included PGlite fallback where supported.
- Provider credentials for live payment processing and Telegram delivery.

## Getting started

Clone the repository and install the locked dependency tree:

```bash
git clone https://github.com/chastechnologiesllc/chas-digital-store.git
cd chas-digital-store
npm ci
```

Copy the environment template and replace the placeholders that apply to your deployment:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The development server listens on port `8080` and binds to `0.0.0.0`. The app environment wrapper loads workspace-level `VITE_` flags before Vite starts; explicit process environment values take precedence.

## Configuration

### Application identity

Update [`src/data/site.ts`](src/data/site.ts) before launch. This file contains the store name, description, locale, default currency, production URL, contact details, and social links. Values enclosed in square brackets are placeholders and should be replaced with real company information.

The current defaults are configured for Nigeria with locale `en-NG`, country `NG`, and currency `NGN`.

### Environment variables

Use [`.env.example`](.env.example) as the authoritative list of supported settings. Important groups include:

| Group | Purpose |
| --- | --- |
| `APP_URL` | Production URL used for canonical links and payment callbacks. |
| `DATABASE_URL` | PostgreSQL connection string. Vercel Postgres or another compatible provider may be used. |
| `PAYSTACK_*` | Paystack secret and public keys. |
| `FLUTTERWAVE_*` | Flutterwave keys and webhook hash. |
| `TELEGRAM_*` | Bot token and product-to-chat delivery mapping. |
| `GROK_PROJECT_ID` | Optional platform-provided deployment identifier. |

Never commit `.env` files or live credentials. Only `.env.example` belongs in the repository.

### Authentication flag

The application supports the `VITE_AUTH_ENABLED` build flag. The development/build wrapper reads it from `.grok/app-env.json` when that workspace file exists, while an explicit environment variable overrides the file value. Production deployments should configure the intended value in the deployment environment.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 8080. |
| `npm run build` | Create the production Vercel/Nitro build and run database migrations when `DATABASE_URL` is available. |
| `npm run preview` | Preview the production build locally. |
| `npm run db:migrate` | Apply pending SQL migrations to `DATABASE_URL`. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run lint` | Run ESLint across the project. |
| `npm test` | Run JavaScript and TypeScript test suites. |
| `npm run check:auth` | Check that development and build authentication behavior agree. |
| `npm run format` | Format project files with Prettier. |

## Database and migrations

SQL migrations live in [`migrations/`](migrations/). The migration runner applies top-level `.sql` files in filename order and records applied files in the `_migrations` table. The Better Auth schema is maintained under [`migrations/auth/`](migrations/auth/) and is copied into the active migration directory only when authentication is enabled by the surrounding application workflow.

For local development without PostgreSQL, the preview/auth layer can use the PGlite fallback. For production, configure a managed PostgreSQL-compatible database and set `DATABASE_URL`.

## Payment and delivery flows

Payment routes are grouped by provider under [`src/routes/api/payments/`](src/routes/api/payments/). Each provider has initialize, verify, and webhook handlers. Server-side payment services live under [`src/lib/payments/`](src/lib/payments/), where provider configuration, order handling, and Telegram delivery are kept out of client bundles.

Before enabling live payments:

1. Configure the provider credentials in the deployment environment.
2. Set `APP_URL` to the final HTTPS domain.
3. Register the provider webhook URLs shown in `.env.example`.
4. Configure Telegram delivery only if products should be delivered through Telegram.
5. Test initialization, verification, webhook replay handling, and access-page delivery in a non-production environment.

## Deployment

The project is structured for Vercel-compatible deployment. Run a production build locally before deploying:

```bash
npm run typecheck
npm run lint
npm run build
```

The build emits a Vercel/Nitro output directory and invokes the migration script. If `DATABASE_URL` is absent, the migration step reports that it is skipping database work; configure the variable in the deployment environment for production database migrations.

[`vercel.json`](vercel.json) adds security headers and long-lived immutable caching for built assets and selected public branding assets.

## Project structure

```text
src/
  components/       Reusable UI, layout, product, and hero components
  data/             Site, catalogue, category, and FAQ content
  lib/              Auth, data, database, payments, and utility modules
  routes/           Pages and payment API handlers
migrations/         PostgreSQL migration files
public/              Public branding assets
scripts/             Build, migration, preview, auth, and environment helpers
```

## Validation status

The imported project has been validated with the following commands:

```bash
npm run typecheck
npm run lint
npm run build
```

All three commands pass in the repository environment. The archive also contains platform-specific template tests that expect private `.grok` fixtures and unrelated demo-app metadata not included in the production archive; those fixtures are not required for the application build.

## Security notes

- Keep payment, database, webhook, and Telegram credentials server-side.
- Do not prefix secrets with `VITE_`, because Vite exposes `VITE_` variables to browser code.
- Use HTTPS in production and configure provider webhooks against the final domain.
- Review placeholder contact and social values before launch.

## License

This repository is maintained for chAs Technologies LLC. Add the applicable license and redistribution terms before publishing the code for external reuse.

## Support

For project-specific changes, open an issue or pull request in the repository. For deployment incidents, include the command run, environment, and relevant non-secret logs while keeping credentials and tokens redacted.

---

Built for **chAs Technologies LLC**.
