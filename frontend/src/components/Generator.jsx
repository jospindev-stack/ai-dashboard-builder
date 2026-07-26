import { Lightbulb, RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'

const EXAMPLES = [
  'Dashboard de ventes e-commerce avec KPIs mensuels et comparaison par région',
  'Tableau de bord RH : effectifs, turnover, recrutements et satisfaction employés',
  'Analytics web : trafic, taux de conversion, sources et comportement utilisateurs',
  'Dashboard financier : revenus, dépenses, marge brute et cash-flow trimestriel',
  'KPIs marketing : performances des campagnes, leads générés et ROI par canal',
  'Tableau de bord SaaS : MRR, churn rate, ARR et croissance des abonnements',
]

export default function Generator({ onGenerate, onRefine, isLoading, hasDashboard }) {
  const [description, setDescription] = useState('')
  const [refineText, setRefineText] = useState('')
  const [showRefine, setShowRefine] = useState(false)

  const handleGenerate = () => {
    if (description.trim().length >= 5) onGenerate(description.trim())
  }

  const handleRefine = () => {
    if (refineText.trim()) {
      onRefine(refineText.trim())
      setRefineText('')
      setShowRefine(false)
    }
  }

  const handleKey = (e, action) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) action()
  }

  return (
    <div className="glass-card p-6">
      {/* Prompt input */}
      <div className="mb-4">
        <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Décrivez votre dashboard
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => handleKey(e, handleGenerate)}
          placeholder="Ex : Un dashboard de ventes avec l'évolution mensuelle du chiffre d'affaires, les top produits, la répartition par région et les KPIs de performance…"
          rows={3}
          disabled={isLoading}
          className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white
                     placeholder-gray-600 text-sm resize-none focus:outline-none focus:ring-2
                     focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all disabled:opacity-50"
        />
        <p className="text-gray-600 text-xs mt-1.5 text-right">
          {description.length}/1000 · Ctrl+Enter pour générer
        </p>
      </div>

      {/* Examples */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Lightbulb size={12} className="text-amber-400" />
          <span className="text-gray-500 text-xs font-medium">Exemples rapides</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setDescription(ex)}
              disabled={isLoading}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white
                         border border-gray-700 hover:border-gray-600 rounded-lg px-3 py-1.5
                         transition-all disabled:opacity-40 text-left"
            >
              {ex.length > 52 ? ex.slice(0, 52) + '…' : ex}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={isLoading || description.trim().length < 5}
          className="btn-primary flex-1"
        >
          <Sparkles size={16} />
          {isLoading ? 'Génération en cours…' : hasDashboard ? 'Regénérer' : 'Générer le Dashboard'}
        </button>

        {hasDashboard && (
          <button
            onClick={() => setShowRefine(!showRefine)}
            disabled={isLoading}
            className="btn-secondary"
          >
            <RotateCcw size={15} />
            Affiner
          </button>
        )}
      </div>

      {/* Refine input */}
      {showRefine && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Modification à apporter
          </label>
          <div className="flex gap-2">
            <input
              value={refineText}
              onChange={(e) => setRefineText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
              placeholder="Ex : Ajoute un graphique radar, change le thème en vert…"
              className="flex-1 bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-2.5
                         text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2
                         focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
            <button
              onClick={handleRefine}
              disabled={!refineText.trim() || isLoading}
              className="btn-primary px-5 py-2.5"
            >
              Affiner
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
