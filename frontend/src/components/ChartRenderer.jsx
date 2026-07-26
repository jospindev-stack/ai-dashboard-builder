import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  ComposedChart, Legend, Line, LineChart, Pie, PieChart,
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar,
  RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtNum(value, unit = '') {
  if (typeof value !== 'number') return String(value)
  if (Math.abs(value) >= 1_000_000) return `${unit}${(value / 1_000_000).toFixed(1)}M`
  if (Math.abs(value) >= 1_000) return `${unit}${(value / 1_000).toFixed(1)}k`
  return `${unit}${value % 1 === 0 ? value : value.toFixed(1)}`
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label, unit = '' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-2xl text-sm min-w-[140px]">
      {label && <p className="text-gray-400 text-xs font-medium mb-2 pb-2 border-b border-gray-800">{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-gray-400">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-semibold text-white">{fmtNum(entry.value, unit)}</span>
        </div>
      ))}
    </div>
  )
}

// ── Shared axis / grid props ──────────────────────────────────────────────────

const axisStyle = { fill: '#9ca3af', fontSize: 11 }
const gridProps = { strokeDasharray: '3 3', stroke: '#1f2937', vertical: false }

function commonProps(chart) {
  return {
    xAxisProps: { dataKey: chart.xAxisKey, tick: axisStyle, axisLine: false, tickLine: false },
    yAxisProps: {
      tick: axisStyle,
      axisLine: false,
      tickLine: false,
      tickFormatter: (v) => fmtNum(v, chart.yAxisUnit ?? ''),
      width: 56,
    },
    tooltipEl: <Tooltip content={<ChartTooltip unit={chart.yAxisUnit ?? ''} />} />,
    legendEl: <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af', paddingTop: 8 }} />,
  }
}

// ── Individual chart components ───────────────────────────────────────────────

function LineChartComp({ chart }) {
  const { xAxisProps, yAxisProps, tooltipEl, legendEl } = commonProps(chart)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chart.data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        {tooltipEl}
        {legendEl}
        {chart.dataKeys.map((dk) => (
          <Line
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name}
            stroke={dk.color}
            strokeWidth={2.5}
            dot={{ r: 3, fill: dk.color, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

function BarChartComp({ chart }) {
  const { xAxisProps, yAxisProps, tooltipEl, legendEl } = commonProps(chart)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chart.data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }} barCategoryGap="30%">
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        {tooltipEl}
        {legendEl}
        {chart.dataKeys.map((dk) => (
          <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

function AreaChartComp({ chart }) {
  const { xAxisProps, yAxisProps, tooltipEl, legendEl } = commonProps(chart)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chart.data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
        <defs>
          {chart.dataKeys.map((dk) => (
            <linearGradient key={dk.key} id={`grad-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dk.color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        {tooltipEl}
        {legendEl}
        {chart.dataKeys.map((dk) => (
          <Area
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            name={dk.name}
            stroke={dk.color}
            strokeWidth={2.5}
            fill={`url(#grad-${dk.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

function PieChartComp({ chart }) {
  const RADIAN = Math.PI / 180
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (percent < 0.05) return null
    const r = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + r * Math.cos(-midAngle * RADIAN)
    const y = cy + r * Math.sin(-midAngle * RADIAN)
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const colors = chart.dataKeys?.[0]?.color
    ? chart.data.map((_, i) => {
        const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316','#84cc16']
        return palette[i % palette.length]
      })
    : []

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chart.data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={false}
          label={renderLabel}
        >
          {chart.data.map((_, i) => (
            <Cell key={i} fill={colors[i] ?? '#3b82f6'} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip formatter={(v) => fmtNum(v)} contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

function RadarChartComp({ chart }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={chart.data} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
        <PolarGrid stroke="#1f2937" />
        <PolarAngleAxis dataKey={chart.xAxisKey ?? 'subject'} tick={{ fill: '#9ca3af', fontSize: 11 }} />
        <PolarRadiusAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} />
        {chart.dataKeys.map((dk) => (
          <Radar
            key={dk.key}
            name={dk.name}
            dataKey={dk.key}
            stroke={dk.color}
            fill={dk.color}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        ))}
        <Legend wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
        <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

function ComposedChartComp({ chart }) {
  const { xAxisProps, yAxisProps, tooltipEl, legendEl } = commonProps(chart)
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={chart.data} margin={{ top: 4, right: 16, bottom: 0, left: 0 }}>
        <defs>
          {chart.dataKeys.filter((dk) => dk.chartType === 'area').map((dk) => (
            <linearGradient key={dk.key} id={`cgrad-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dk.color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        {tooltipEl}
        {legendEl}
        {chart.dataKeys.map((dk) => {
          const t = dk.chartType ?? 'bar'
          if (t === 'line')
            return <Line key={dk.key} type="monotone" dataKey={dk.key} name={dk.name} stroke={dk.color} strokeWidth={2.5} dot={false} />
          if (t === 'area')
            return <Area key={dk.key} type="monotone" dataKey={dk.key} name={dk.name} stroke={dk.color} fill={`url(#cgrad-${dk.key})`} strokeWidth={2} />
          return <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[4, 4, 0, 0]} />
        })}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

const SIZE_CLASS = {
  full: 'col-span-12',
  half: 'col-span-12 lg:col-span-6',
  third: 'col-span-12 lg:col-span-4',
}

export default function ChartRenderer({ chart }) {
  const sizeClass = SIZE_CLASS[chart.size] ?? 'col-span-12 lg:col-span-6'

  const renderChart = () => {
    switch (chart.type) {
      case 'line':     return <LineChartComp chart={chart} />
      case 'bar':      return <BarChartComp chart={chart} />
      case 'area':     return <AreaChartComp chart={chart} />
      case 'pie':      return <PieChartComp chart={chart} />
      case 'radar':    return <RadarChartComp chart={chart} />
      case 'composed': return <ComposedChartComp chart={chart} />
      default:         return <BarChartComp chart={chart} />
    }
  }

  return (
    <div className={sizeClass}>
      <div className="glass-card p-5 h-full">
        <div className="mb-4">
          <h3 className="text-white font-semibold text-sm">{chart.title}</h3>
          {chart.description && (
            <p className="text-gray-500 text-xs mt-0.5">{chart.description}</p>
          )}
        </div>
        {renderChart()}
      </div>
    </div>
  )
}
