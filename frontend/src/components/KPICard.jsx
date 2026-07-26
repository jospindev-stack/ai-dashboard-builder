import {
  Activity, BarChart2, Clock, DollarSign, Package,
  Star, Target, TrendingDown, TrendingUp, Users, Zap,
} from 'lucide-react'

const ICON_MAP = {
  dollar: DollarSign,
  users: Users,
  chart: BarChart2,
  target: Target,
  clock: Clock,
  trending_up: TrendingUp,
  trending_down: TrendingDown,
  activity: Activity,
  star: Star,
  zap: Zap,
  package: Package,
}

const THEME_GRADIENTS = {
  blue:   'from-blue-500/10 to-indigo-500/5 border-blue-500/20',
  green:  'from-emerald-500/10 to-teal-500/5 border-emerald-500/20',
  purple: 'from-purple-500/10 to-violet-500/5 border-purple-500/20',
  orange: 'from-orange-500/10 to-amber-500/5 border-orange-500/20',
  red:    'from-red-500/10 to-rose-500/5 border-red-500/20',
}

const ICON_BG = {
  blue:   'bg-blue-500/20 text-blue-400',
  green:  'bg-emerald-500/20 text-emerald-400',
  purple: 'bg-purple-500/20 text-purple-400',
  orange: 'bg-orange-500/20 text-orange-400',
  red:    'bg-red-500/20 text-red-400',
}

export default function KPICard({ kpi, theme = 'blue' }) {
  const Icon = ICON_MAP[kpi.icon] ?? BarChart2
  const gradient = THEME_GRADIENTS[theme] ?? THEME_GRADIENTS.blue
  const iconBg = ICON_BG[theme] ?? ICON_BG.blue

  const isUp = kpi.trend === 'up'
  const isDown = kpi.trend === 'down'

  return (
    <div className={`glass-card bg-gradient-to-br ${gradient} p-5 flex flex-col gap-3`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium truncate">{kpi.label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
          <Icon size={18} />
        </div>
      </div>

      {/* Value */}
      <div>
        <p className="text-2xl font-bold text-white tracking-tight">{kpi.value}</p>
      </div>

      {/* Change */}
      <div className="flex items-center gap-1.5">
        {isUp && <TrendingUp size={14} className="text-emerald-400 flex-shrink-0" />}
        {isDown && <TrendingDown size={14} className="text-red-400 flex-shrink-0" />}
        <span
          className={`text-xs font-semibold ${
            isUp ? 'text-emerald-400' : isDown ? 'text-red-400' : 'text-gray-400'
          }`}
        >
          {kpi.change}
        </span>
      </div>
    </div>
  )
}
