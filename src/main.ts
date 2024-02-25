import { ChangeDetectionStrategy, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { GameComponent } from './components/game/game.component';
import { PageLayout } from './components/page-layout/page-layout';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PageLayout, GameComponent],
  template: `
    <app-page-layout>
      <app-game></app-game>
    </app-page-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
}

void bootstrapApplication(App);
