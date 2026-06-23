// src/lib/github.ts
// Thin Octokit wrapper for committing new blog posts (MDX + images)
// directly to the repo. Vercel's runtime filesystem is read-only — the
// admin form runs server-side and commits via the GitHub Contents API.
//
// One commit = one file. The createPost flow commits the MDX file, then
// each image, in sequence. Vercel auto-redeploys on push (in production).
//
// Env vars:
//   GITHUB_TOKEN   — fine-grained PAT with contents:write on this repo
//   GITHUB_OWNER   — default "jenniemlv"
//   GITHUB_REPO    — default "jennie-slade-photo"
//   GITHUB_BRANCH  — default "main"

import { Octokit } from '@octokit/rest'

interface CommitFileArgs {
  path: string
  content: Buffer | string
  message: string
}

let _client: Octokit | null = null
function client(): Octokit {
  if (_client) return _client
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN env var is required')
  _client = new Octokit({ auth: token })
  return _client
}

function repo() {
  return {
    owner: process.env.GITHUB_OWNER || 'jenniemlv',
    repo: process.env.GITHUB_REPO || 'jennie-slade-photo',
    branch: process.env.GITHUB_BRANCH || 'main',
  }
}

/**
 * Commit a single file (create or update) to the repo.
 * GitHub's contents API requires base64-encoded content.
 */
export async function commitFile({ path, content, message }: CommitFileArgs): Promise<void> {
  const { owner, repo: name, branch } = repo()
  const buf = typeof content === 'string' ? Buffer.from(content, 'utf8') : content

  // Check if the file exists to get its sha (required for updates).
  let sha: string | undefined
  try {
    const existing = await client().repos.getContent({ owner, repo: name, path, ref: branch })
    if (!Array.isArray(existing.data) && 'sha' in existing.data) {
      sha = existing.data.sha
    }
  } catch {
    // File doesn't exist — that's fine, we're creating it.
  }

  await client().repos.createOrUpdateFileContents({
    owner,
    repo: name,
    path,
    message,
    content: buf.toString('base64'),
    branch,
    sha,
  })
}
