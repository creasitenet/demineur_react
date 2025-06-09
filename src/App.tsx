import { useState } from 'react'
import type { GameLevel } from './types/demineur'
import { GAME_LEVELS } from './types/demineur'
import Board from './components/Board'

function App() {
  const [level, setLevel] = useState<GameLevel>('facile')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="w-full max-w-screen-lg mx-auto rounded-xl shadow-2xl bg-white/90 p-6">
        <h1 className="text-5xl font-extralight text-center mb-6 text-gray-900 drop-shadow-lg">
          Démineur
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="flex flex-col gap-4 w-full md:w-1/3 bg-gray-50 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900">
                Niveaux de difficulté
              </h2>
              <div className="space-y-1">
                {Object.entries(GAME_LEVELS).map(([levelKey, config]) => (
                  <button
                    key={levelKey}
                    className={`px-4 py-2 text-white rounded w-full ${level === levelKey ? 'bg-gray-500' : 'bg-gray-300'} hover:bg-gray-600`}
                    onClick={() => setLevel(levelKey as GameLevel)}
                  >
                    <div className="font-medium">{levelKey}</div>
                    <div className="text-sm">
                      {config.mines} mines, grille {config.rows}x{config.columns}
                    </div>
                  </button>
                ))}
            </div>
            
            <div>
              <h3 className="font-bold mb-2 text-gray-900">Comment jouer :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Clic gauche : découvrir une case</li>
                <li>Clic droit : placer/enlever un drapeau</li>
                <li>Les chiffres indiquent le nombre de mines adjacentes</li>
                <li>Trouvez toutes les mines pour gagner !</li>
              </ul>
            </div>
          </div>
          
          {/* Grille de jeu - à droite */}
          <div className="flex flex-col items-center w-full md:w-2/3 bg-gray-50 rounded-lg shadow p-6">
            <Board level={level} />
          </div>
        </div>

      </div>  
    </div>
  )
}

export default App
