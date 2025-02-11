import { GitHubProperties } from '@/app/api/github/route'
import { redis } from '@/lib/redis'
import ActivityCalendar from 'rsc-activity-calendar'

export const GitHubActivity = async () => {
  const github: GitHubProperties = (await redis.get(
    'github'
  )) as GitHubProperties

  if (!github) return null

  const quarterLength = Math.floor(github.data.length / 4)
  const firstQuarterData = github.data.slice(0, quarterLength)
  const secondQuarterData = github.data.slice(quarterLength, quarterLength * 2)
  const thirdQuarterData = github.data.slice(
    quarterLength * 2,
    quarterLength * 3
  )
  const fourthQuarterData = github.data.slice(quarterLength * 3)

  return (
    <div className="relative grid gap-0.5 sm:grid-cols-2 sm:gap-[3px] sm:p-8 lg:gap-1">
      {[
        thirdQuarterData,
        fourthQuarterData,
        firstQuarterData,
        secondQuarterData
      ].map((data, index) => (
        <ActivityCalendar
          key={index}
          hideColorLegend
          hideTotalCount
          hideMonthLabels
          data={data}
          // weekStart={1}
          theme={{
            light: ['#f7f7f7', '#d1fae5', '#10b981', '#047857', '#065f46'],
            dark: ['#1f2937', '#d1fae5', '#10b981', '#047857', '#065f46']
          }}
        />
      ))}
      <div className="to-backdrop absolute bottom-0 left-0 right-0 z-10 h-full bg-gradient-to-b from-transparent sm:bottom-8 sm:h-40" />
      <a
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-muted-foreground"
        href="https://github.com/PunGrumpy"
        target="_blank"
        rel="noopener noreferrer"
      >
        {github.total} contributions in the last year
      </a>
    </div>
  )
}
