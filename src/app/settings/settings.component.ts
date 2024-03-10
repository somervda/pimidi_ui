import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService, Settings } from '../services/setting.service';
import { Subscription } from 'rxjs';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatOption,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnDestroy {
  settings$$: Subscription | undefined;
  cvMaxVolts$$: Subscription | undefined;
  cvMidiChannel$$: Subscription | undefined;
  cvMinHertz$$: Subscription | undefined;
  midiDisplay$$: Subscription | undefined;
  midiDefaultChannel$$: Subscription | undefined;
  cvSetValue$$: Subscription | undefined;
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

  constructor(
    private fb: FormBuilder,
    private settingService: SettingService,
    private playerService: PlayerService
  ) {
    this.settingService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.settingsForm.setValue({
        cvMaxVolts: this.settings.cv.max_volts,
        cvMidiChannel: this.settings.cv.midi_channel,
        cvMinHertz: this.settings.cv.min_hertz,
        midiDisplay: this.settings.midi.display,
        midiDefaultChannel: this.settings.midi.default_channel,
      });
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
      cvMinHertz: [
        this.settings.cv.min_hertz,
        [Validators.required, Validators.min(8), Validators.max(13000)],
      ],
      midiDisplay: this.settings.midi.display,
      midiDefaultChannel: [
        this.settings.midi.default_channel,
        [Validators.required, Validators.min(1), Validators.max(16)],
      ],
    });
  }

  cv(value: number, on: boolean) {
    this.cvSetValue$$ = this.playerService
      .cvSetValue(value, on)
      .subscribe(() => {});
  }

  update(): void {
    // console.log('update', this.cacheForm);
    if (this.settingsForm.invalid == false)
      for (const field in this.settingsForm.controls) {
        const control = this.settingsForm.controls[field];
        if (control.touched) {
          // console.log(field, control);
          switch (field) {
            case 'cvMaxVolts':
              this.cvMaxVolts$$ = this.settingService
                .setCVMaxVolts(control.value)
                .subscribe(() => {});
              break;
            case 'cvMidiChannel':
              this.cvMidiChannel$$ = this.settingService
                .setCVMidiChannel(control.value)
                .subscribe(() => {});
              break;
            case 'cvMinHertz':
              this.cvMinHertz$$ = this.settingService
                .setCVMinHertz(control.value)
                .subscribe(() => {});
              break;
            case 'midiDisplay':
              this.midiDisplay$$ = this.settingService
                .setMidiDisplay(control.value)
                .subscribe(() => {});
              break;
            case 'midiDefaultChannel':
              this.midiDefaultChannel$$ = this.settingService
                .setMidiDefaultChannel(control.value)
                .subscribe(() => {});
              break;

            default:
          }
        }
      }
  }

  ngOnDestroy(): void {
    if (this.settings$$) {
      this.settings$$.unsubscribe();
    }
    if (this.cvMaxVolts$$) {
      this.cvMaxVolts$$.unsubscribe();
    }
    if (this.cvMidiChannel$$) {
      this.cvMidiChannel$$.unsubscribe();
    }
    if (this.midiDisplay$$) {
      this.midiDisplay$$.unsubscribe();
    }
    if (this.midiDefaultChannel$$) {
      this.midiDefaultChannel$$.unsubscribe();
    }
    if (this.cvSetValue$$) {
      this.cvSetValue$$.unsubscribe();
    }
  }
}
