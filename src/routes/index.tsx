import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-800">FlavorForge</span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-700">
            <a href="#brains" className="hover:text-brand-500 transition-colors">AI Brains</a>
            <a href="#modes" className="hover:text-brand-500 transition-colors">Modes</a>
            <a href="#how-it-works" className="hover:text-brand-500 transition-colors">How It Works</a>
            <Link to="/chat" className="hover:text-brand-500 transition-colors">Chat</Link>
          </nav>
          <Link
            to="/generate"
            className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Start Cooking
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-sm font-medium mb-8">
            AI-Powered Culinary Operating System
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-brand-950 leading-tight mb-6">
            Your Intelligent
            <br />
            <span className="text-brand-600">Culinary Partner</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate recipes from ingredients, recreate dishes from images, improve flavor,
            find substitutes, and optimize nutrition — all powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/generate"
              className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-3.5 rounded-full text-base font-semibold transition-all hover:shadow-[0_8px_30px_rgba(87,98,70,0.3)] hover:-translate-y-0.5"
            >
              Start Generating Recipes
            </Link>
            <Link
              to="/vision"
              className="glass border-2 border-brand-200 hover:border-brand-400 text-brand-700 px-8 py-3.5 rounded-full text-base font-semibold transition-all hover:bg-white/80 hover:-translate-y-0.5"
            >
              Upload a Dish Image
            </Link>
          </div>
        </div>
      </section>

      {/* 8 AI Brains */}
      <section id="brains" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-950 text-center mb-4">
            Eight Specialized AI Brains
          </h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-12">
            Each brain is purpose-built for a specific culinary task, working together
            to deliver restaurant-quality results.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brains.map((brain) => (
              <div
                key={brain.id}
                className="glass-card rounded-2xl p-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 flex items-center justify-center text-xl font-bold mb-5 shadow-inner border border-white group-hover:scale-110 transition-transform duration-300">
                  {brain.icon}
                </div>
                <h3 className="font-semibold text-brand-900 mb-2">{brain.name}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{brain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Modes */}
      <section id="modes" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-950 text-center mb-4">
            Six Recipe Modes
          </h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-12">
            Select up to 4 modes simultaneously. When modes conflict, we respect your priority order.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modes.map((mode) => (
              <div
                key={mode.id}
                className="glass-card rounded-xl p-6 group cursor-pointer"
              >
                <h3 className="font-semibold text-brand-900 mb-1">{mode.label}</h3>
                <p className="text-sm text-brand-600">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-950 text-center mb-4">
            How It Works
          </h2>
          <p className="text-brand-600 text-center max-w-2xl mx-auto mb-12">
            From ingredients to a complete culinary analysis in seconds.
          </p>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 flex gap-6 items-center">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-brand-900 text-lg">{step.title}</h3>
                  <p className="text-brand-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-brand-100 mb-8 max-w-lg mx-auto">
            Join FlavorForge and experience the future of culinary AI.
          </p>
          <Link
            to="/generate"
            className="inline-block bg-white text-brand-700 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-brand-50 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-brand-500">
          FlavorForge AI — Your AI Culinary Operating System
        </div>
      </footer>
    </div>
  )
}

const brains = [
  { id: 1, icon: '🧠', name: 'Recipe Knowledge', description: 'Grounded culinary knowledge from structured recipe data, ingredient databases, and cuisine information.' },
  { id: 2, icon: '🔍', name: 'Ingredient Intelligence', description: 'Normalizes ingredients, resolves synonyms, and categorizes every item in your pantry.' },
  { id: 3, icon: '👁️', name: 'Vision Engine', description: 'Identifies dishes, ingredients, and cuisine from uploaded food images.' },
  { id: 4, icon: '⚙️', name: 'Recipe Reasoning', description: 'Core generation engine that analyzes goals, applies modes, and creates complete recipes.' },
  { id: 5, icon: '👅', name: 'Flavor Intelligence', description: 'Analyzes salt, acid, fat, umami, aromatics, and texture to optimize taste.' },
  { id: 6, icon: '🔄', name: 'Ingredient Substitutes', description: 'Finds the best alternatives for missing ingredients with confidence scores.' },
  { id: 7, icon: '📊', name: 'Nutrition Engine', description: 'Calculates macros from structured USDA data — no AI estimation.' },
  { id: 8, icon: '💬', name: 'Culinary Chat', description: 'Cooking-focused assistant for techniques, troubleshooting, and meal prep.' },
]

const modes = [
  { id: 'ingredients-only', label: 'Use Only My Ingredients', description: 'Strictly uses only the ingredients you provided.' },
  { id: 'max-flavor', label: 'Maximum Flavor', description: 'Optimize for taste above all else.' },
  { id: 'healthy', label: 'Healthy Version', description: 'Low-calorie, nutrient-dense alternative.' },
  { id: 'budget', label: 'Budget Mode', description: 'Cost-effective ingredients and minimal waste.' },
  { id: 'restaurant', label: 'Restaurant Mode', description: 'Authentic techniques and premium ingredients.' },
  { id: 'experimental', label: 'Experimental Chef Mode', description: 'Creative fusion and unexpected combinations.' },
]

const steps = [
  { title: 'Add Your Ingredients', description: 'Type in what you have in your pantry, fridge, or garden.' },
  { title: 'Select Your Modes', description: 'Choose up to 4 cooking modes like Healthy, Budget, or Maximum Flavor.' },
  { title: 'AI Generates Your Recipe', description: 'Eight specialized AI brains work together to create the perfect dish.' },
  { title: 'Review & Cook', description: 'See cookability, flavor analysis, nutrition, substitutions, and more.' },
]
