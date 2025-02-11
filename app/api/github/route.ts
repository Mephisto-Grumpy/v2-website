import { redis } from '@/lib/redis'
import { endOfWeek, subDays, subWeeks } from 'date-fns'
import type { Activity } from 'rsc-activity-calendar'

export type GitHubProperties = {
  total: number
  data: Activity[]
}

type GitHubContributionsApiResponse = {
  contributions: Activity[]
}

export const maxDuration = 300
export const revalidate = 0
export const dynamic = 'force-dynamic'

export const GET = async (): Promise<Response> => {
  try {
    const today = endOfWeek(subWeeks(new Date(), 1))
    const oneYearAgo = subDays(today, 365)
    const twoYearsAgo = subDays(today, 1092)

    const response: GitHubContributionsApiResponse = await fetch(
      'https://github-contributions-api.jogruber.de/v4/PunGrumpy'
    ).then(res => res.json())

    if (!response.contributions.length) {
      throw new Error('No contributions found')
    }

    const content: GitHubProperties = {
      data: response.contributions
        .filter(({ date }) => {
          const dateObj = new Date(date)
          return dateObj <= today && dateObj >= twoYearsAgo
        })
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      total: response.contributions.reduce(
        (total, { date, count }) =>
          new Date(date) >= oneYearAgo && new Date(date) <= today
            ? total + count
            : total,
        0
      )
    }

    redis.set('github', JSON.stringify(content))

    return new Response(undefined, { status: 204 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return new Response(message, { status: 500 })
  }
}
