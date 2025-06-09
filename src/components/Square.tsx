import { SQUARE_VALUES } from '../types/demineur';

interface SquareProps {
  value: number; // La valeur sous-jacente (0-8 ou 9 pour mine)
  state: 'hidden' | 'revealed' | 'flagged' | 'exploded' | 'bad_flag' | 'unfound_mine'; // L'état de la case
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const Square = ({ value, state, onClick, onRightClick }: SquareProps) => {
  // Détermine le nom de l'image à afficher selon l'état et la valeur de la case
  const getImageName = () => {
    switch (state) {
      case 'hidden':
        return 'hidden';
      case 'flagged':
        return 'flag';
      case 'exploded':
        return 'exploded';
      case 'bad_flag':
        return 'bad_flag';
      case 'unfound_mine':
        return 'mine'; // Affiche une mine non trouvée (pour la fin du jeu)
      case 'revealed':
        // Si la case est révélée, afficher sa valeur
        if (value === SQUARE_VALUES.MINE) return 'mine'; // Ne devrait pas arriver en théorie si on gère bien le clic sur mine séparément
        if (value === SQUARE_VALUES.EMPTY) return '0';
        if (value >= 1 && value <= 8) return `${value}`;
        return 'hidden'; // Fallback si révélée mais valeur inattendue
      default:
        return 'hidden'; // Fallback pour état inconnu
    }
  };

  return (
    <div 
      style={{
        width: '16px',
        height: '16px',
        padding: 0,
        margin: 0,
        lineHeight: 0,
        display: 'inline-block',
        fontSize: 0, // Élimine tout espace potentiel
      }}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <img
        src={`/images/${getImageName()}.gif`}
        alt="case"
        style={{
          width: '16px',
          height: '16px',
          display: 'block',
          padding: 0,
          margin: 0,
        }}
        draggable={false}
      />
    </div>
  );
};

export default Square;