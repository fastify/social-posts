// Publishes Markdown posts to the Fastify LinkedIn organization page.
//
// Usage: node scripts/publish-linkedin.mjs [--dry-run] <file.md> [...]
//
// Env:
//   LINKEDIN_ACCESS_TOKEN    OAuth token with the w_organization_social scope
//   LINKEDIN_ORGANIZATION_ID numeric id of the Fastify organization page
//   LINKEDIN_API_VERSION     optional, YYYYMM (see https://learn.microsoft.com/en-us/linkedin/marketing/versioning)

import { readFile } from 'node:fs/promises'

const DEFAULT_API_VERSION = '202609'

// LinkedIn "little text format": these characters must be escaped,
// otherwise the post gets truncated or rejected.
// https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/little-text-format
const RESERVED = /[\\|{}@[\]()<>#*_~]/g

function escape (text) {
  return text.replace(RESERVED, (c) => `\\${c}`)
}

// LinkedIn does not render Markdown, so we strip it down to plain text
function toLinkedInText (markdown) {
  return markdown
    .trim()
    .split('\n')
    .map((line) => {
      const bullet = line.match(/^\s*[*-]\s+(.*)$/)
      if (bullet) line = `• ${bullet[1]}`
      line = line.replace(/\*\*(.+?)\*\*/g, '$1')
      // Hashtags become real hashtags, everything else is escaped
      return line
        .split(/((?<=^|\s)#[\p{L}\p{N}_]+)/u)
        .map((part, i) => i % 2 === 1
          ? `{hashtag|\\#|${part.slice(1)}}`
          : escape(part))
        .join('')
    })
    .join('\n')
}

async function publish (commentary) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN
  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID
  if (!token || !organizationId) {
    throw new Error('LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORGANIZATION_ID are required')
  }

  const response = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': process.env.LINKEDIN_API_VERSION || DEFAULT_API_VERSION,
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify({
      author: `urn:li:organization:${organizationId}`,
      commentary,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    })
  })

  if (response.status !== 201) {
    throw new Error(`LinkedIn API responded ${response.status}: ${await response.text()}`)
  }
  return response.headers.get('x-restli-id')
}

async function main (args) {
  const dryRun = args.includes('--dry-run')
  const files = args.filter((arg) => arg !== '--dry-run')

  if (files.length === 0) {
    console.log('No posts to publish')
    return
  }

  for (const file of files) {
    const commentary = toLinkedInText(await readFile(file, 'utf8'))

    if (dryRun) {
      console.log(`::group::[dry-run] ${file}\n${commentary}\n::endgroup::`)
      continue
    }

    const urn = await publish(commentary)
    console.log(`Published ${file}: https://www.linkedin.com/feed/update/${urn}`)
  }
}

await main(process.argv.slice(2))
