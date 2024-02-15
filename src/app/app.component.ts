import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { SettingsComponent } from './settings/settings.component';
import { AiComponent} from './ai/ai.component';
import { SequencerComponent } from './sequencer/sequencer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatTabsModule,
    SettingsComponent,
    AiComponent,
    SequencerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pimidi_ui';
}
