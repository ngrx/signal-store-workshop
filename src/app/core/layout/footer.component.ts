import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngrx-footer',
  standalone: true,
  template: '<p>© 2024 NgRx Team</p>',
  styles: `
    :host {
      display: block;
      margin: 0 2rem;
    }

    p {
      text-align: center;
      padding: 1rem;
      margin: 0;
      font-size: 1rem;
      color: rgba(0, 0, 0, 0.6);
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
