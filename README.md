![ANNIverse](docs/assets/anniverse-logo.svg)

> A volunteer management platform built for [Childhood Cancer Society](https://childhoodcancersociety.org)

## Goals

The CCS dev team's goal for ANNIverse is to create a full end-to-end experience

## Project Structure and Setup

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

A quick peek at the basic tech under the hood:

- Next.js
- Prisma
- tRPC
- NextAuth
- Tailwind CSS

### Prerequisites

You'll need to have Node 16+, npm, and a local version of postgresql 14+ installed. Reach out if you're having trouble getting set up here.

### Getting Started

Clone, npm install, create a .env file, and run basic db migrations to get up and running:

```bash
$ git clone git@github.com:ChildhoodCancerSociety/ANNIverse.git
$ cd ANNIverse
$ npm install
$ cp .env.example .env
$ npm run db:migrate
$ npm run dev
```

### File Structure

```yaml
📦 src
┃
┃ # React components that serve as pure compositional pieces
┃ # These components should never be used in isolation,
┃ # but rather should be combined to create more specific "molecule"-type components
┣ 🧱 atoms
┃
┃ # "Molecule"-type components
┃ # These components will show up either as is or in composition in pages
┣ 🏠 components
┃
┃ # Reusable React hooks
┣ 🪝 hooks
┃
┃ # Next.js pages directory with api routes
┣ 🏣 pages
┃
┃ # Plugins for more advanced module usage within ANNIverse
┃ # These would include specific CCS functionality that we might not deem
┃ # core parts of the platform, such as GitHub integration for the dev team
┣ 🔌 plugins
┃
┃ # Server-specific code + business logic
┃ # Includes prisma and tRPC bootstrapping code
┣ 👔 server
┃ ┣ 📂 api
┃ ┃ ┗ 📂 routers
┃ ┃   ┃
┃ ┃   ┃ # Base nomenclature for model-related tRPC routing code
┃ ┃   ┣ 📜 x.mutations.ts
┃ ┃   ┣ 📜 x.queries.ts
┃ ┃   ┗ 📜 x.validators.ts
┃ ┃
┃ ┣ 📜 auth.ts
┃ ┣ 📜 cache.ts
┃ ┗ 📜 db.ts
┃
┃ # All global styles live here
┣ 💇‍♀️ styles
┃ ┗ 📜 globals.css
┃
┃ # Utilities (helpers, cross-stack code, etc.) live here
┣ 🛠️ utils
┃
┃ # Environment variables are loaded and parsed from .env here
┗ 🗺️ env.mjs
```

### `.env` setup

You'll need the following in your `.env` in order to do anything meaningful:

```yaml
# When adding additional environment variables, the schema in "/src/env.mjs"
# should be updated accordingly.

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL=""

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

Look in the Discord if you need values for Discord application client ID and secret, or PM a maintainer.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## Deployment

- TBD

## Contributors

<a href="https://github.com/ChildhoodCancerSociety/ANNIverse/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ChildhoodCancerSociety/ANNIverse" />
</a>

Reach out at webdev@childhoodcancersociety.org if you'd like to support or help out with development![^1]

[^1]: Contribution image made with [contrib.rocks](https://contrib.rocks).
