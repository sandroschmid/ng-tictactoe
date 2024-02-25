import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  template: `
    <div class="app">
      <header>
        <h1>{{ appName }}</h1>
      </header>
      <main>
        <ng-content />
      </main>
      <footer>
        &copy; 2024 Sandro Schmid, MSc
      </footer>
    </div>
  `,
  styleUrl: './page-layout.css',
})
export class PageLayout {
  appName: string;

  constructor(title: Title) {
    this.appName = title.getTitle();
  }
}
