import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/core/layout/header.component';
import { FooterComponent } from '@/core/layout/footer.component';

@Component({
  selector: 'ngrx-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <ngrx-header />
    <main>
      <router-outlet />
    </main>
    <ngrx-footer />
  `,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
