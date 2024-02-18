import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule,MatCardModule
],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  settingsForm: FormGroup;
  settings: undefined;
  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      pumpOnSeconds: [
        this.settings?.pumpOnSeconds,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(500),
          Validators.pattern('^[0-9]*$'),
        ],
      ])

   }

}
