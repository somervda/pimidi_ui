import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService, Settings } from '../services/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatCardModule, MatInputModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settings$$: Subscription | undefined;
  settings: Settings = {
    cv: {
      max_volts: 5,
      min_hertz: 8,
      midi_channel: 1,
    },
    midi: {
      display: false,
      default_channel: 1,
    },
  };
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private settingService: SettingService) {
    this.settingService.getSettings().subscribe((settings) => {
      this.settings = settings;
      // this.settingsForm.patchValue(this.settings);
      this.settingsForm.setValue({
        cvMaxVolts: this.settings.cv.max_volts,
        cvMidiChannel: this.settings.cv.midi_channel,
      });
      // console.log('this.cache:', this.cache, this.cacheForm);
    });

    this.settingsForm = this.fb.group({
      cvMaxVolts: [
        this.settings.cv.max_volts,
        [Validators.required, Validators.min(0), Validators.max(12)],
      ],
      cvMidiChannel: [
        this.settings.cv.midi_channel,
        [Validators.required, Validators.min(1), Validators.max(16)],
      ],
    });
  }
}
