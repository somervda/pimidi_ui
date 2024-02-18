import { Injectable } from '@angular/core';

export interface Settings {
  cvMaxVolts: number;
  cvMidiChannel: number;
  cvMinHertz: number;
  midiDisplay: boolean;
  midiDefaultChannel: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  

  constructor() { }
}
