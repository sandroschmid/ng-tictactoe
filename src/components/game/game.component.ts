import { FieldComponent } from '@/components/game/field/field.component';
import { GameStatusComponent } from '@/components/game/game-status/game-status.component';
import { PlayerComponent } from '@/components/game/player.component';
import { GameService } from '@/services/game.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    PlayerComponent,
    FieldComponent,
    GameStatusComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {

  readonly fields = this.gameService.getFields();
  readonly currentPlayer = this.gameService.currentPlayer;
  readonly winner = this.gameService.winner;

  constructor(private readonly gameService: GameService) {
  }

  get isPlaying() {
    return !this.winner();
  }

  onPlay(index: number) {
    this.gameService.playField(index);
  }

  onRestart() {
    this.gameService.restart();
  }
}
