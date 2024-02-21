import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'ngrx-header',
  standalone: true,
  imports: [MatToolbar, RouterLink],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/">SignalStore Workshop</a>
    </mat-toolbar>
  `,
  styles: `
    a {
      color: inherit;
      text-decoration: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
