import { Injectable } from '@angular/core';
// import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';

export interface Settings {
  cv: {
    max_volts: number;
    midi_channel: number;
    min_hertz: number;
  };
  midi: {
    display: boolean;
    default_channel: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor(private http: HttpClient) {}

  getSettings() {
    let value = this.http.get<Settings>('http://pimidi.local:8000/settings');
    return value;
  }
}
