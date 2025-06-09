import { useState, useEffect } from 'react';
import type { GameLevel, GameConfig, AdjacentMines } from '../types/demineur';
import { GAME_LEVELS, SQUARE_VALUES } from '../types/demineur';
import Square from './Square';

// Définir la structure pour chaque case de la grille
interface GridSquare {
  value: number; // 0-8 pour les nombres, 9 pour les mines
  state: 'hidden' | 'revealed' | 'flagged' | 'exploded' | 'bad_flag' | 'unfound_mine';
}

interface BoardProps {
  level: GameLevel;
}

const Board = ({ level }: BoardProps) => {
  const [grid, setGrid] = useState<GridSquare[][]>([]);
  const [gameConfig, setGameConfig] = useState<GameConfig>(GAME_LEVELS.facile);
  const [remainingMines, setRemainingMines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showDebugGrid] = useState(false);

  // Initialiser la grille
  useEffect(() => {
    const config = GAME_LEVELS[level];
    setGameConfig(config);
    setRemainingMines(config.mines);
    setGameOver(false);
    setGameWon(false);
    // Initialiser la grille vide, puis placer les mines et les nombres
    const initialGrid = initializeGrid(config);
    const gridWithMinesAndNumbers = placeMinesAndCalculateNumbers(initialGrid, config);
    setGrid(gridWithMinesAndNumbers);
  }, [level]);

  // Initialiser une grille vide (avec l'état hidden)
  const initializeGrid = (config: GameConfig): GridSquare[][] => {
    return Array(config.rows)
      .fill(null)
      .map(() => Array(config.columns).fill({ value: 0, state: 'hidden' })); // Initialiser avec une valeur par défaut et l'état caché
  };

  // Placer les mines aléatoirement et calculer les nombres
  const placeMinesAndCalculateNumbers = (initialGrid: GridSquare[][], config: GameConfig): GridSquare[][] => {
    const newGrid = initialGrid.map(row => row.map(square => ({ ...square }))); // Créer une copie profonde
    let minesPlaced = 0;

    // Placer les mines
    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.rows);
      const col = Math.floor(Math.random() * config.columns);

      // Utiliser la valeur MINE directement (9)
      if (newGrid[row][col].value !== SQUARE_VALUES.MINE) {
        newGrid[row][col].value = SQUARE_VALUES.MINE;
        minesPlaced++;
      }
    }

    // Calculer les nombres pour chaque case non minée
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.columns; col++) {
        if (newGrid[row][col].value !== SQUARE_VALUES.MINE) {
          const adjacentMines = countAdjacentMines(newGrid, row, col, config);
          // Stocker la valeur réelle (0-8) directement
          newGrid[row][col].value = adjacentMines as AdjacentMines; // Stocker directement 0-8
        }
      }
    }

    return newGrid;
  };

  // Compter les mines adjacentes (adapté à la nouvelle structure)
  const countAdjacentMines = (
    grid: GridSquare[][],
    row: number,
    col: number,
    config: GameConfig
  ): AdjacentMines => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < config.rows &&
          newCol >= 0 &&
          newCol < config.columns &&
          // Vérifier la valeur de la case adjacente
          grid[newRow][newCol].value === SQUARE_VALUES.MINE
        ) {
          count++;
        }
      }
    }
    return Math.min(count, 8) as AdjacentMines;
  };

  // Gérer le clic sur une case (adapté à la nouvelle structure)
  const handleClick = (row: number, col: number) => {
    if (gameOver || gameWon || grid[row][col].state !== 'hidden') return; // Ne rien faire si déjà révélé ou marqué

    const newGrid = grid.map(row => row.map(square => ({ ...square }))); // Créer une nouvelle copie profonde
    const clickedSquare = newGrid[row][col];

    // Si on clique sur une mine : défaite
    if (clickedSquare.value === SQUARE_VALUES.MINE) {
      clickedSquare.state = 'exploded'; // Marquer la mine cliquée comme explosée
      revealAllMines(newGrid); // Révéler toutes les autres mines
      setGameOver(true);
      setGrid(newGrid);
      return;
    }

    // Sinon (case non minée) : révéler la case et propager si vide
    revealSquare(newGrid, row, col);

    // Après avoir révélé la ou les cases, vérifier si la partie est gagnée
    if (checkWinCondition(newGrid)) {
        setGameWon(true);
        revealAllMines(newGrid); // Révéler toutes les mines en cas de victoire (pour afficher les mines non marquées)
        setGrid(newGrid); // Mettre à jour l'état pour afficher les mines à la victoire
    } else {
        setGrid(newGrid); // Mettre à jour l'état pour le jeu en cours
    }
  };

  // Révéler une case et propager si vide (adapté à la nouvelle structure)
  const revealSquare = (grid: GridSquare[][], row: number, col: number) => {
    // Vérifier les limites
    if (
      row < 0 ||
      row >= gameConfig.rows ||
      col < 0 ||
      col >= gameConfig.columns
    ) {
      return;
    }

    const square = grid[row][col];

    // Ne rien faire si déjà révélé ou marqué d'un drapeau
    if (square.state !== 'hidden') {
      return;
    }

    // Révéler la case
    square.state = 'revealed';

    // Si la case révélée est vide (0 mines adjacentes), propager la révélation
    if (square.value === SQUARE_VALUES.EMPTY) {
      // Parcourir les voisins (y compris les diagonales)
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // S'assurer de ne pas appeler récursivement sur la case actuelle
          if (i !== 0 || j !== 0) {
             revealSquare(grid, row + i, col + j);
          }
        }
      }
    }
  };

  // Révéler toutes les mines (adapté à la nouvelle structure)
  const revealAllMines = (grid: GridSquare[][]) => {
    for (let row = 0; row < gameConfig.rows; row++) {
      for (let col = 0; col < gameConfig.columns; col++) {
        const square = grid[row][col];
        if (square.value === SQUARE_VALUES.MINE) {
          if (square.state !== 'exploded') {
             square.state = 'unfound_mine'; // Marquer les mines non cliquées
          }
        } else if (square.state === 'flagged') {
          // Marquer les drapeaux mal placés (sur des cases non minées)
           square.state = 'bad_flag';
        }
      }
    }
  };

  // Gérer le clic droit (placer/enlever un drapeau) (adapté à la nouvelle structure)
  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameWon || grid[row][col].state === 'revealed' || grid[row][col].state === 'exploded' || grid[row][col].state === 'bad_flag' || grid[row][col].state === 'unfound_mine') return; // Ne rien faire si déjà révélé/mine explosée/mauvais drapeau/mine non trouvée

    const newGrid = grid.map(row => row.map(square => ({ ...square }))); // Créer une nouvelle copie profonde
    const currentSquare = newGrid[row][col];

    if (currentSquare.state === 'hidden') {
      // Placer un drapeau
      if (remainingMines > 0) {
        currentSquare.state = 'flagged';
        setRemainingMines(prev => prev - 1);
      }
    } else if (currentSquare.state === 'flagged') {
      // Enlever un drapeau
      currentSquare.state = 'hidden';
      setRemainingMines(prev => prev + 1);
    }

    setGrid(newGrid);
    // Vérifier la condition de victoire après avoir placé/enlevé un drapeau (utile si placer le dernier drapeau gagne)
    if (checkWinCondition(newGrid)) {
        setGameWon(true);
        revealAllMines(newGrid); // Révéler toutes les mines en cas de victoire
        setGrid(newGrid); // Mettre à jour l'état
    }
  };

  // Vérifier la condition de victoire (adapté à la nouvelle structure)
  const checkWinCondition = (grid: GridSquare[][]): boolean => {
    let revealedNonMineCount = 0;
    let totalNonMines = gameConfig.rows * gameConfig.columns - gameConfig.mines;

    for (let row = 0; row < gameConfig.rows; row++) {
      for (let col = 0; col < gameConfig.columns; col++) {
        const square = grid[row][col];
        // Compter les cases non minées qui sont révélées
        if (square.value !== SQUARE_VALUES.MINE && square.state === 'revealed') {
          revealedNonMineCount++;
        }
      }
    }

    // Condition de victoire: toutes les cases non minées sont révélées
    return revealedNonMineCount === totalNonMines;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        Mines restantes : {remainingMines}
      </div>
      {gameOver && (
        <div className="text-red-600 mb-2">Perdu !</div>
      )}
      {gameWon && (
        <div className="text-green-600 mb-2">Gagné !</div>
      )}
      <div
        style={{
          display: 'inline-block',
          border: '2px solid #7b7b7b',
          backgroundColor: '#c0c0c0',
          padding: '5px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gameConfig.columns}, 16px)`,
            gridTemplateRows: `repeat(${gameConfig.rows}, 16px)`,
            gap: 0,
            lineHeight: 0,
            fontSize: 0, // Élimine tout espace potentiel
          }}
        >
          {grid.map((row, rowIndex) =>
            Array.isArray(row) ? row.map((square, colIndex) => (
              // Passer l'objet square entier au composant Square
              <Square
                key={`${rowIndex}-${colIndex}`}
                value={square.value} // Passer la valeur
                state={square.state} // Passer l'état
                onClick={() => handleClick(rowIndex, colIndex)}
                onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
              />
            )) : null
          )}
        </div>
      </div>

      {/* Affichage textuel de la grille pour le débogage */}
      {/* Affiché conditionnellement en utilisant showDebugGrid state */}
      {showDebugGrid && (
        <div style={{ marginTop: '20px', fontFamily: 'monospace', whiteSpace: 'pre' }}>
          <h3>Debug Grid Values:</h3>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((square, colIndex) => (
                <span key={colIndex} style={{ display: 'inline-block', width: '2ch', textAlign: 'center' }}>
                  {/* Afficher la valeur réelle (M pour mine, ou 0-8) */}
                  {square.value === SQUARE_VALUES.MINE ? 'M' : square.value}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Board;