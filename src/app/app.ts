import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./use-cases/home/home/home";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('PixelParts');
}
