# Fastify Social Posts

This repository is the collaborative space for drafting, reviewing, and publishing **Fastify community content**.
Posts may be shared on **LinkedIn, the Fastify blog, and other social platforms**.

Contributions are welcome!

## How it works

* **Draft**: Create a new file (Markdown with front-matter) and open a Pull Request.
* **Review**: The community and maintainers review drafts before merging.
* **Publish**: Once merged, new posts are published automatically.

## LinkedIn

Every new file added to the `linkedin/` folder is published to the Fastify LinkedIn page
when its Pull Request is merged into `main`. Editing an existing post does not publish it again.

LinkedIn does not render Markdown, so the post is converted to plain text:
`**bold**` markers are removed, `*` / `-` list items become `•` and `#words` become hashtags.
The rendered text is printed by the `Publish LinkedIn posts` check on every Pull Request.

The [workflow](.github/workflows/publish-linkedin.yml) runs in the `linkedin` environment and needs:

* `LINKEDIN_ACCESS_TOKEN` secret: an OAuth token with the `w_organization_social` scope,
  issued to a page admin.
* `LINKEDIN_ORGANIZATION_ID` variable: the numeric id of the Fastify LinkedIn page.
* `LINKEDIN_API_VERSION` variable (optional): the `YYYYMM` LinkedIn API version.

A post can be published manually (or previewed with `dry-run`) by running the workflow from the Actions tab.
