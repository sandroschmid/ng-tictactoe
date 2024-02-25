import { PlayerComponent } from '@/components/game/player.component';
import type { PlayerValue, Winner } from '@/utils/types';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-status',
  standalone: true,
  imports: [PlayerComponent],
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStatusComponent {

  @Input({ required: true }) winner!: Winner;
  @Input({ required: true }) currentPlayer!: PlayerValue;

  @Output() readonly restart = new EventEmitter<void>();

  onRestart() {
    this.restart.emit();
  }

}
