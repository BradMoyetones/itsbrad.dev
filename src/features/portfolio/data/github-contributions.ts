import "server-only"

import { GITHUB_USERNAME } from "@/config/site"
import { getCachedContributions } from "@/lib/get-cached-contributions"

export function getGitHubContributions() {
  return getCachedContributions(GITHUB_USERNAME)
}
