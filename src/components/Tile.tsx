import type { CSSProperties } from 'react';
import type { TileState } from '../types';

interface TileProps {
  letter: string;
  state: TileState;
  delay?: number;
}

export function Tile({ letter, state, delay = 0 }: TileProps) {
  return (
    <div
      className={`tile tile--${state}`}
      style={{ animationDelay: `${delay}ms`, '--flip-delay': `${delay}ms` } as CSSProperties}
      data-letter={letter}
    >
      <span className="tile__letter">{letter}</span>
    </div>
  );
}
