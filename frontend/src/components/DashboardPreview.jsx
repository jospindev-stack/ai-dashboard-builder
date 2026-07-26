import { Calendar, Download } from 'lucide-react'
import ChartRenderer from './ChartRenderer'
import KPICard from './KPICard'

const THEME_BADGE = {
  blue:   'bg-blue-500/20 text-blue-300 border-blue-500/30',
  green:  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  red:    'bg-red-500/20 text-red-300 border-red-500/30',
}

const THEME_DIVIDER = {
  blue:   'from-blue-500 to-indigo-500',
  green:  'from-emerald-500 to-teal-500',
  purple: 'from-purple-500 to-violet-500',
  orange: 'from-orange-500 to-amber-500',
  red:    'from-red-500 to-rose-500',
}

export default function DashboardPreview({ dashboard }) {
  const theme = dashboard.theme ?? 'blue'
  const badgeCls = THEME_BADGE[theme] ?? THEME_BADGE.blue
  const dividerCls = THEME_DIVIDER[theme] ?? THEME_DIVIDER.blue

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(dashboard, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${dashboard.title?.replace(/\s+/g, '-').toLowerCase() ?? 'dashboard'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Dashboard header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          {/* Colored divider */}
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${dividerCls} mb-3`} />
          <h2 className="text-2xl font-bold text-white">{dashboard.title}</h2>
          {dashboard.subtitle && (
            <p className="text-gray-400 text-sm mt-1">{dashboard.subtitle}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            {dashboard.period && (
              <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                <Calendar size={12} />
                {dashboard.period}
              </span>
            )}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeCls}`}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)} theme
            </span>
          </div>
        </div>

        <button onClick={handleExport} className="btn-secondary flex-shrink-0 text-sm">
          <Download size={14} />
          Export JSON
        </button>
      </div>

      {/* KPI cards */}
      {dashboard.kpis?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dashboard.kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} theme={theme} />
          ))}
        </div>
      )}

      {/* Charts grid */}
      {dashboard.charts?.length > 0 && (
        <div className="grid grid-cols-12 gap-4">
          {dashboard.charts.map((chart) => (
            <ChartRenderer key={chart.id} chart={chart} />
          ))}
        </div>
      )}
    </div>
  )
}
