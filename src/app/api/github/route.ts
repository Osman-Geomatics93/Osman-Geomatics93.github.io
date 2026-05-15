import { NextResponse } from 'next/server'

export const dynamic = process.env.NEXT_STATIC_EXPORT === 'true' ? 'auto' : 'force-dynamic'

const USERNAME = 'Osman-Geomatics93'

const ghHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PLpgSQL: '#336791',
  LESS: '#1d365d',
  Shell: '#89e051',
  Makefile: '#427819',
  Batchfile: '#C1F12E',
  QML: '#44a51c',
  Dockerfile: '#384d54',
}

export async function GET() {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: ghHeaders,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
        { headers: ghHeaders, next: { revalidate: 3600 } }
      ),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { next: { revalidate: 3600 } }
      ),
    ])

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: 502 })
    }

    const [user, repos, contribData] = await Promise.all([
      userRes.json(),
      reposRes.json(),
      contribRes.ok ? contribRes.json() : Promise.resolve(null),
    ])

    // Aggregate languages from primary language per repo
    const langCount: Record<string, number> = {}
    let totalStars = 0
    let totalForks = 0

    for (const repo of repos) {
      totalStars += repo.stargazers_count ?? 0
      totalForks += repo.forks_count ?? 0
      if (repo.language && !repo.fork) {
        langCount[repo.language] = (langCount[repo.language] ?? 0) + 1
      }
    }

    // Top 6 languages by repo count, with colors
    const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0)
    const topLanguages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
        pct: Math.round((count / totalLangRepos) * 100),
        color: LANG_COLORS[name] ?? '#6b7280',
      }))

    // Top repos (by stars, exclude forks)
    const topRepos = repos
      .filter((r: { fork: boolean }) => !r.fork)
      .sort(
        (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
          b.stargazers_count - a.stargazers_count
      )
      .slice(0, 6)
      .map((r: {
        name: string; html_url: string; description: string | null;
        stargazers_count: number; language: string | null; topics: string[]
      }) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        stars: r.stargazers_count,
        language: r.language,
        langColor: LANG_COLORS[r.language ?? ''] ?? '#6b7280',
        topics: r.topics?.slice(0, 3) ?? [],
      }))

    // Contribution calendar — last 52 weeks
    const contributions: Array<{ date: string; count: number; level: number }> =
      contribData?.contributions ?? []

    // Organise into 52 × 7 grid (week-major)
    const today = new Date()
    const weeks: Array<Array<{ date: string; count: number; level: number }>> = []
    let currentWeek: Array<{ date: string; count: number; level: number }> = []

    const contribMap = new Map(contributions.map((c) => [c.date, c]))
    const startDate = new Date(today)
    startDate.setDate(startDate.getDate() - 364)
    // align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay())

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10)
      const entry = contribMap.get(key) ?? { date: key, count: 0, level: 0 }
      currentWeek.push(entry)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    if (currentWeek.length) weeks.push(currentWeek)

    const totalContribs = contributions.reduce((s, c) => s + c.count, 0)

    return NextResponse.json(
      {
        login: user.login,
        name: user.name,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        totalContribs,
        topLanguages,
        topRepos,
        weeks,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    )
  } catch (err) {
    console.error('GitHub widget error:', err)
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
