import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'ngrx-progress-bar',
  standalone: true,
  imports: [MatProgressBar],
  template: `
    @if (showProgress()) {
      <mat-progress-bar mode="indeterminate" />
    } @else {
      <mat-progress-bar mode="determinate" value="100" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  readonly showProgress = input(true);
}
