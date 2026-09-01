Millions of developers install Fastify packages every week. That trust is not something we take lightly, so we spent the last few months hardening how the organization publishes code.

Here is what changed: https://backend.cafe/how-we-are-securing-the-fastify-organization

* **Access control**: we built `org-admin`, a Node.js toolset that answers "who can publish this package?" across the whole org. It has a dry-run mode and generates review-ready scripts before anything is applied, so forgotten credentials from inactive contributors no longer linger. Releases stay manual on purpose: a human should always be the one to hit the publish button.
* **CI hardening**: we dropped the dangerous `pull_request_target` triggers, made workflow tokens read-only by default, and pinned every action to a full commit SHA. A tag is a mutable pointer, and whoever compromises the action owner can move it under your feet.
* **Dependency scripts**: two lines in `.npmrc` do a surprising amount of work. `ignore-scripts=true` stops lifecycle scripts from running on install, and `min-release-age=7` refuses versions younger than seven days, which is usually enough time for a malicious release to be spotted and unpublished.

Still on our list: npm provenance, GitHub immutable releases, and a written incident response plan.

None of this is exotic. It is supply chain hygiene that any maintainer can put in place in an afternoon, and if you maintain a package with users, it is worth the afternoon.

#Fastify #NodeJS #OpenSource #Security #SupplyChainSecurity #DevSecOps #SecureOpenSourceFund
