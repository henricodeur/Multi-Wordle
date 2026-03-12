import type { TileData } from '../types';
import { Tile } from './Tile';
import { WORD_LENGTH, MAX_GUESSES } from '../lib/gameLogic';

interface BoardProps {
  guesses: TileData[][];
  currentGuess: string;
  currentRow: number;
  shake: boolean;
  fantomeMode?: boolean;
}

export function Board({ guesses, currentGuess, currentRow, shake, fantomeMode }: BoardProps) {
  // Lettres vertes confirmées par position (d'après les lignes déjà soumises)
  const correctPositions: (string | null)[] = Array(WORD_LENGTH).fill(null);
  guesses.forEach(guess => {
    guess.forEach((tile, col) => {
      if (tile.state === 'correct') correctPositions[col] = tile.letter;
    });
  });

  return (
    <div className="board">
      {Array(MAX_GUESSES).fill(null).map((_, rowIdx) => {
        const isCurrentRow = rowIdx === currentRow;
        const isSubmitted = rowIdx < guesses.length;
        const guess = guesses[rowIdx];

        const rowClass = [
          'board-row',
          isCurrentRow && shake ? 'board-row--shake' : '',
        ].filter(Boolean).join(' ');

        return (
          <div key={rowIdx} className={rowClass}>
            {Array(WORD_LENGTH).fill(null).map((_, colIdx) => {
              // Ligne déjà soumise : affichage normal
              if (isSubmitted && guess) {
                return (
                  <Tile
                    key={colIdx}
                    letter={guess[colIdx].letter}
                    state={guess[colIdx].state}
                    delay={(0.15 + 0.3 * colIdx) * 1000}
                  />
                );
              }

              // Lettre fantôme pour cette position (si mode actif)
              const ghost = fantomeMode ? (correctPositions[colIdx] ?? '') : '';

              // Ligne courante : lettre tapée > fantôme > vide
              if (isCurrentRow) {
                const typed = currentGuess[colIdx] || '';
                if (typed === '_') {
                  return <Tile key={colIdx} letter="" state="skip" />;
                }
                if (typed) {
                  return <Tile key={colIdx} letter={typed} state="active" />;
                }
                if (ghost) {
                  return <Tile key={colIdx} letter={ghost} state="ghost" />;
                }
                return <Tile key={colIdx} letter="" state="empty" />;
              }

              // Ligne future : fantôme ou vide
              if (ghost) {
                return <Tile key={colIdx} letter={ghost} state="ghost" />;
              }
              return <Tile key={colIdx} letter="" state="empty" />;
            })}
          </div>
        );
      })}
    </div>
  );
}
