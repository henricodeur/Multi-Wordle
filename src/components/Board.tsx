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
  return (
    <div className="board">
      {Array(MAX_GUESSES).fill(null).map((_, rowIdx) => {
        const isCurrentRow = rowIdx === currentRow;
        const isSubmitted = rowIdx < guesses.length;
        const guess = guesses[rowIdx];

        const rowClass = [
          'board-row',
          isCurrentRow && shake ? 'board-row--shake' : '',
          isSubmitted && fantomeMode ? 'board-row--fantome' : '',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={rowIdx}
            className={rowClass}
          >
            {Array(WORD_LENGTH).fill(null).map((_, colIdx) => {
              if (guess) {
                return (
                  <Tile
                    key={colIdx}
                    letter={guess[colIdx].letter}
                    state={guess[colIdx].state}
                    delay={(0.15 + 0.3 * colIdx) * 1000}
                  />
                );
              }
              if (isCurrentRow) {
                const letter = currentGuess[colIdx] || '';
                const state = !letter ? 'empty' : letter === '_' ? 'skip' : 'active';
                return (
                  <Tile
                    key={colIdx}
                    letter={letter === '_' ? '' : letter}
                    state={state}
                  />
                );
              }
              return <Tile key={colIdx} letter="" state="empty" />;
            })}
          </div>
        );
      })}
    </div>
  );
}
