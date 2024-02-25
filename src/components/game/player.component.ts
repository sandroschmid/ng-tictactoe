import type { PlayerValue } from '@/utils/types';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  template: `
    <em [attr.data-player]="value">{{ value }}</em>
  `,
  styles: `
    :host {
      display: contents;
    }
    em {
      font-size: 1.2rem;
      font-weight: bold;
      background: var(--color-surface-player-x);

      &[data-player="O"] {
        background: var(--color-surface-player-o);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input({ required: true }) value!: PlayerValue;
}
