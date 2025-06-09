// Constantes pour les valeurs des cases
export const SQUARE_VALUES = {
  EMPTY: 0, // Case vide révélée
  MINE: 9, // Mine révélée
  // États cachés ou marqués (utiliser des valeurs négatives pour les distinguer des valeurs révélées 0-9)
  HIDDEN: -1, // Case cachée
  FLAG: -2, // Case marquée d'un drapeau
  EXPLODED: -3, // Mine sur laquelle on a cliqué (défaite)
  BAD_FLAG: -4, // Drapeau mal placé (après défaite)
  UNFOUND_MINE: -5, // Mine non marquée (après défaite ou victoire)
} as const;

// Type pour les nombres de mines adjacentes (0-8)
export type AdjacentMines = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Type pour les valeurs des cases (peut être une AdjacentMines si révélée, ou une valeur d'état spécial si cachée/marquée)
export type SquareValue = AdjacentMines | typeof SQUARE_VALUES[keyof typeof SQUARE_VALUES];

// Le type HiddenSquareValue n'est plus nécessaire avec cette approche de valeurs distinctes
// export type HiddenSquareValue = SquareValue | (AdjacentMines & { __brand: 'hidden' });

export type GameLevel = 'facile' | 'normal' | 'avance' | 'impossible';

export interface GameConfig {
  rows: number;
  columns: number;
  mines: number;
}

export const GAME_LEVELS: Record<GameLevel, GameConfig> = {
  facile: { rows: 9, columns: 9, mines: 10 },
  normal: { rows: 16, columns: 16, mines: 40 },
  avance: { rows: 16, columns: 30, mines: 99 },
  impossible: { rows: 30, columns: 30, mines: 150 }
}; 