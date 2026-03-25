<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Log in</title>
</svelte:head>

<div class="min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--color-secondary),_transparent_36%),linear-gradient(180deg,_var(--color-background),color-mix(in_oklch,var(--color-background)_88%,white))] px-4 py-12">
	<div class="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_28rem]">
		<section class="rounded-3xl border border-border/70 bg-card/60 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur md:p-10">
			<p class="text-xs uppercase tracking-[0.35em] text-muted-foreground">Solisec dashboard</p>
			<h1 class="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
				Welcome back.
			</h1>
			<p class="mt-4 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">
				Log in with the credentials stored in your Better Auth D1 tables. This page posts directly to a server action.
			</p>
			<div class="mt-8 rounded-2xl border border-border/60 bg-background/70 p-5 text-sm text-muted-foreground">
				<p class="font-medium text-foreground">Need an account first?</p>
				<p class="mt-2">Create one at <a class="font-medium text-primary underline-offset-4 hover:underline" href="/auth/signup">/auth/signup</a>.</p>
			</div>
		</section>

		<section class="rounded-3xl border border-border/70 bg-card p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)] md:p-10">
			<h2 class="text-2xl font-semibold tracking-tight text-foreground">Log in</h2>
			<p class="mt-2 text-sm text-muted-foreground">Use the email and password attached to your account.</p>

			{#if data.registered}
				<p class="mt-6 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
					Account created. You can log in now.
				</p>
			{/if}

			<form method="POST" use:enhance class="mt-8 space-y-5">
				<div>
					<label class="mb-2 block text-sm font-medium text-foreground" for="email">Email</label>
					<input class="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" id="email" name="email" type="email" autocomplete="email" required value={form?.values?.email ?? ''} />
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-foreground" for="password">Password</label>
					<input class="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" id="password" name="password" type="password" autocomplete="current-password" required />
				</div>

				{#if form?.message}
					<p class="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
						{form.message}
					</p>
				{/if}

				<button class="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-92" type="submit">
					Log in
				</button>
			</form>
		</section>
	</div>
</div>
