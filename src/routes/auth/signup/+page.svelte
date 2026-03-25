<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Sign up</title>
</svelte:head>

<div class="min-h-screen bg-[radial-gradient(circle_at_top,_var(--color-secondary),_transparent_40%),linear-gradient(180deg,_var(--color-background),color-mix(in_oklch,var(--color-background)_84%,white))] px-4 py-12">
	<div class="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_28rem]">
		<section class="rounded-3xl border border-border/70 bg-card/60 p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)] backdrop-blur md:p-10">
			<p class="text-xs uppercase tracking-[0.35em] text-muted-foreground">Solisec dashboard</p>
			<h1 class="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
				Create your account.
			</h1>
			<p class="mt-4 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">
				Use email and password to get into the dashboard. Your account is created on the server through Better Auth.
			</p>
			<div class="mt-8 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
				<div class="rounded-2xl border border-border/60 bg-background/70 p-4">
					<p class="font-medium text-foreground">Server-backed signup</p>
					<p class="mt-2">Validation and account creation happen in the page action, not in the browser.</p>
				</div>
				<div class="rounded-2xl border border-border/60 bg-background/70 p-4">
					<p class="font-medium text-foreground">Progressively enhanced</p>
					<p class="mt-2">The form works with JavaScript disabled and feels faster when enhancement is available.</p>
				</div>
			</div>
		</section>

		<section class="rounded-3xl border border-border/70 bg-card p-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.55)] md:p-10">
			<div class="flex items-start justify-between gap-4">
				<div>
					<h2 class="text-2xl font-semibold tracking-tight text-foreground">Sign up</h2>
					<p class="mt-2 text-sm text-muted-foreground">Already have an account? <a class="font-medium text-primary underline-offset-4 hover:underline" href="/auth/login">Log in</a>.</p>
				</div>
			</div>

			<form method="POST" use:enhance class="mt-8 space-y-5">
				<div>
					<label class="mb-2 block text-sm font-medium text-foreground" for="name">Name</label>
					<input class="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" id="name" name="name" type="text" autocomplete="username" required value={form?.values?.name ?? ''} />
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-foreground" for="email">Email</label>
					<input class="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" id="email" name="email" type="email" autocomplete="email" required value={form?.values?.email ?? ''} />
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-foreground" for="password">Password</label>
					<input class="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" id="password" name="password" type="password" autocomplete="new-password" required />
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-foreground" for="confirmPassword">Confirm password</label>
					<input class="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm" id="confirmPassword" name="confirmPassword" type="password" autocomplete="new-password" required />
				</div>

				{#if form?.message}
					<p class="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
						{form.message}
					</p>
				{/if}

				<button class="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-92" type="submit">
					Create account
				</button>
			</form>
		</section>
	</div>
</div>
