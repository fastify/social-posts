The new https://fastify.dev is live 🚀

We rebuilt it from scratch, and we wanted the site to feel as fast as the framework. A few things worth pointing at:

* A dark-first, instrument-panel aesthetic we kept calling "Telemetry" while building it. The hero carries a live **requests-per-second velocity gauge** that ticks against the official `fastify/benchmarks` data. So it's literally telling you how Fastify is doing right now.
* **Pagefind-powered search**, version-aware across the whole site. Searching from a v5.10.x docs page gives you v5.10.x results, not every minor we've ever shipped.
* **Ecosystem** with client-side filtering. The featured plugins on the homepage are now picked by npm download volume, not by whoever shouted loudest in a PR comment.
* A refreshed **benchmarks** section, sourced straight from `fastify/benchmarks`, plus an **organizations & team** page with a proper active-contributors ranking (Tier 4 and Tier 3 sponsors get equal logo weight, separated into their own sections).
* The **versioned docs** you already used (latest, every v5.x, v4.29.x, v3.29.x), now under Astro + MDX. Source of truth still lives in `fastify/fastify`. We just fetch and transform at build time, no copy-paste drift.
* Zero-flash light/dark toggle, keyboard-accessible focus, reduced-motion support, responsive nav. Boring but deliberate.

Stack: **Astro** + **Tailwind CSS v4** + **MDX** + **Pagefind**. Variable fonts (Space Grotesk, Inter, JetBrains Mono). Linted with Biome.

If something looks off or a link 404s, that's a bug, not a feature. Open an issue on https://github.com/fastify/website and we'll fix it.

Go take it for a spin ⚡

#Fastify #NodeJS #OpenSource #WebDevelopment #Astro #TailwindCSS #WebDesign
