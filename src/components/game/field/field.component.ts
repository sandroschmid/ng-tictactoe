import { PlayerComponent } from '@/components/game/player.component';
import { GameService } from '@/services/game.service';
import type { FieldValue, PlayerValue } from '@/utils/types';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [PlayerComponent],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent {

  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: FieldValue;
  @Input({ required: true }) playing = false;

  @Output() play = new EventEmitter<number>();

  constructor(private readonly gameService: GameService) {
  }

  get hasBeenPlayed() {
    return this.value !== '';
  }

  get gridPosition() {
    return this.gameService.getGridIndex(this.index);
  }

  get isWinningField() {
    if (this.playing) {
      return undefined;
    }

    return this.gameService.winningFields().includes(this.index);
  }

  onClick() {
    this.play.emit(this.index);
  }

  player(field: FieldValue): PlayerValue {
    if (field === '') {
      throw new Error('not a player');
    }
    return field as PlayerValue;
  }
}
