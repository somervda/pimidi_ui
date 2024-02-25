import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService, Settings } from '../services/setting.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatCardModule, MatInputModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settings : Settings | undefined;
  settingsForm: FormGroup;
  cvMaxVolts: number = 5;
  cvMidiChannel: number = 1;
  cvMinHertz: number = 8;
  midiDisplay: boolean = true;
  midiDefaultChannel: number = 1;

  constructor(private fb: FormBuilder, private settingService: SettingService) {
    this.settingsForm = this.fb.group({
      cvMaxVolts: [
        this.cvMaxVolts,
        [Validators.required, Validators.min(0), Validators.max(12)],
      ],
      cvMidiChannel: [
        this.cvMidiChannel,
        [Validators.required, Validators.min(1), Validators.max(16)],
      ],
    });
  }
}
