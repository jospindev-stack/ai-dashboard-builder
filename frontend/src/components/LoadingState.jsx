const STEPS = [
  'Analyse de votre description…',
  'Choix des types de graphiques…',
  'Génération des données réalistes…',
  'Assemblage du dashboard…',
]

export default function LoadingState({ step = 0 }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8">
      {/* Animated rings */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-400 animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">📊</div>
      </div>

      {/* Step text */}
      <div className="text-center">
        <p className="text-white font-semibold text-lg mb-1">{STEPS[Math.min(step, STEPS.length - 1)]}</p>
        <p className="text-gray-500 text-sm">Groq LLaMA 3.3 70B génère votre dashboard</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i <= step ? 'bg-indigo-500 w-6' : 'bg-gray-700 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
