import { AlertCircle, BarChart2, Github, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import DashboardPreview from './components/DashboardPreview'
import Generator from './components/Generator'
import LoadingState from './components/LoadingState'

const LOADING_STEPS = [
  'Analyse de votre description…',
  'Choix des types de graphiques…',
  'Génération des données réalistes…',
  'Assemblage du dashboard…',
]

export default function App() {
  const [dashboard, setDashboard] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const dashboardRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  const startLoading = () => {
    setIsLoading(true)
    setError(null)
    setLoadingStep(0)
    let step = 0
    timerRef.current = setInterval(() => {
      step = Math.min(step + 1, LOADING_STEPS.length - 1)
      setLoadingStep(step)
    }, 900)
  }

  const stopLoading = () => {
    clearInterval(timerRef.current)
    setIsLoading(false)
    setLoadingStep(0)
  }

  const scrollToDashboard = () => {
    setTimeout(() => dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleGenerate = async (description) => {
    startLoading()
    try {
      const res = await fetch('/api/dashboard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Génération échouée')
      setDashboard(data.dashboard)
      scrollToDashboard()
    } catch (err) {
      setError(err.message)
    } finally {
      stopLoading()
    }
  }

  const handleRefine = async (instruction) => {
    if (!dashboard) return
    startLoading()
    try {
      const res = await fetch('/api/dashboard/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentConfig: dashboard, instruction }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Modification échouée')
      setDashboard(data.dashboard)
    } catch (err) {
      setError(err.message)
    } finally {
      stopLoading()
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BarChart2 size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">AI Dashboard Builder</span>
            <span className="hidden sm:inline text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
              Powered by Groq
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Github size={18} />
          </a>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero — only shown before first generation */}
        {!dashboard && !isLoading && (
          <div className="text-center py-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={13} className="text-indigo-400" />
              <span className="text-indigo-300 text-xs font-medium">LLaMA 3.3 70B via Groq</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Décrivez votre dashboard,<br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                l'IA le construit
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Décrivez en langage naturel le dashboard que vous voulez. L'IA génère
              automatiquement les graphiques interactifs, les KPIs et les données réalistes.
            </p>
          </div>
        )}

        {/* Generator */}
        <Generator
          onGenerate={handleGenerate}
          onRefine={handleRefine}
          isLoading={isLoading}
          hasDashboard={!!dashboard}
        />

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading */}
        {isLoading && <LoadingState step={loadingStep} />}

        {/* Dashboard */}
        {!isLoading && dashboard && (
          <div ref={dashboardRef}>
            <DashboardPreview dashboard={dashboard} />
          </div>
        )}

        {/* Empty hint */}
        {!isLoading && !dashboard && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              { icon: '🎨', title: 'Thème automatique', desc: 'Couleurs et style adaptés à votre domaine' },
              { icon: '📊', title: '6 types de graphiques', desc: 'Line, Bar, Area, Pie, Radar, Composed' },
              { icon: '⚡', title: 'Génération < 5 sec', desc: 'Groq API ultra-rapide avec LLaMA 3.3 70B' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-card p-5 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-white font-semibold text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="relative border-t border-gray-800/60 mt-16 py-6 text-center text-gray-600 text-xs">
        AI Dashboard Builder — React · Recharts · TailwindCSS · Node.js · Groq API
      </footer>
    </div>
  )
}
