import { PlayerComponent } from '@/components/game/player.component';
import { GameService } from '@/services/game.service';
import type { FieldValue, PlayerValue } from '@/utils/types';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    PlayerComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {

  readonly fields = this.gameService.getFields();
  readonly currentPlayer = this.gameService.currentPlayer;
  readonly winningFields = this.gameService.winningFields;
  readonly winner = this.gameService.winner;

  constructor(private readonly gameService: GameService) {
  }

  get status() {
    return this.winner() ? 'done' : 'playing';
  }

  getRow(index: number) {
    return this.gameService.getGridIndex(index).row;
  }

  getCol(index: number) {
    return this.gameService.getGridIndex(index).col;
  }

  isWinningField(index: number) {
    return this.winningFields().includes(index);
  }

  onClick(index: number) {
    this.gameService.playField(index);
  }

  player(field: FieldValue): PlayerValue {
    if (field === '') {
      throw new Error('not a player');
    }
    return field as PlayerValue;
  }

  restart() {
    this.gameService.restart();
  }
}
