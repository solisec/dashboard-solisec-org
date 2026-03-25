# dashboard-solisec-org

SvelteKit on Cloudflare Workers with Better Auth, Drizzle/D1, Tailwind, and Vite+.

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate the original scaffold this project started from:

```sh
# recreate the original scaffold
pnpm dlx sv@0.13.0 create --template minimal --types ts --add vitest="usages:unit,component" playwright tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:cloudflare+cfTarget:workers" devtools-json drizzle="database:d1" better-auth="demo:password" mcp="ide:opencode" --install pnpm ./dashboard-solisec-org
```

## Developing

Install dependencies and use Vite+ commands directly:

```sh
vp install
vp dev

# or start the server and open the app in a new browser tab
vp dev -- --open
```

Useful commands:

```sh
vp check
vp test --run
vp build
vp preview
```

## Building

To create a production version of your app:

```sh
vp build
```

You can preview the production build with `vp preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
