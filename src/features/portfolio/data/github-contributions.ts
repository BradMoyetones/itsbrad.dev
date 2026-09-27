import { GITHUB_USERNAME } from "@/config/site";
import type { Activity } from "@/components/ui/contribution-graph";

export async function getGitHubContributions(): Promise<Activity[]> {
  const apiUrl = import.meta.env.PUBLIC_GITHUB_CONTRIBUTIONS_API_URL || "https://github-contributions-api.jogruber.de/v4";
  
  try {
    const res = await fetch(apiUrl + "/" + GITHUB_USERNAME + "?y=last");
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.contributions ?? [];
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return [];
  }
}
