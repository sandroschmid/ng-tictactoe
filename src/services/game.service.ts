import type { FieldValue, PlayerValue, Winner } from '@/utils/types';
import { computed, Injectable, signal } from '@angular/core';

const INITIAL_FIELDS: FieldValue[] = ['', '', '', '', '', '', '', '', ''];
const INITIAL_PLAYER: PlayerValue = 'O';
const WINNING_COMBINATIONS = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // cols
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private readonly fields = signal(INITIAL_FIELDS);
  private readonly prevPlayer = signal(INITIAL_PLAYER);

  readonly currentPlayer = computed(() => this.getNextPlayer());
  readonly winningFields = computed(() => this.getWinningFields());

  readonly winner = computed<Winner>(() => {
    const fvs = this.fields();
    const [winningIndex] = this.winningFields();
    if (winningIndex !== undefined) {
      return fvs[winningIndex] as PlayerValue;
    }

    return fvs.every(fv => fv !== '')
      ? 'draw'
      : undefined;
  });

  getFields() {
    return this.fields.asReadonly();
  }

  getGridIndex(index: number) {
    return {
      row: Math.floor(index / 3),
      col: index % 3,
    };
  }

  playField(index: number) {
    const player = this.currentPlayer();
    this.fields.update(f => {
      const next = f.slice();
      next[index] = player;

      const remainingIndices = next.map((fv, index) => ({ empty: fv === '', index }))
        .filter(fv => fv.empty)
        .map(fv => fv.index);
      if (remainingIndices.length === 1) {
        const [win] = this.getWinningFields(next);
        if (win === undefined) {
          next[remainingIndices[0]] = this.getNextPlayer(player);
        }
      }

      return next;
    });
    this.prevPlayer.set(player);
  }

  restart() {
    this.fields.set(INITIAL_FIELDS);
    this.prevPlayer.set(INITIAL_PLAYER);
  }

  private getNextPlayer(player: PlayerValue = this.prevPlayer()) {
    return player === 'O' ? 'X' : 'O';
  }

  private getWinningFields(fields = this.fields()) {
    const isWin = (i1: number, i2: number, i3: number) => fields[i1] !== '' && fields[i1] === fields[i2] && fields[i2] === fields[i3];
    for (const [f1, f2, f3] of WINNING_COMBINATIONS) {
      if (isWin(f1, f2, f3)) {
        return [f1, f2, f3];
      }
    }

    return [];
  }
}
