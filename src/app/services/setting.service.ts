import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../app.config';

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

  // Special version to get all settings in one request
  getSettings() {
    let value = this.http.get<Settings>(
      'http://' + Globals.HOSTANDPORT + '/settings'
    );
    return value;
  }

  getCVMaxVoltage() {
    let value = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/CVMaxVoltage'
    );
    return value;
  }
  setCVMaxVolts(value: number) {
    let result = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/CVMaxVolts/' + value.toString()
    );
    return result;
  }
  getCVMidiChannel() {
    let value = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/CVMidiChannel'
    );
    return value;
  }
  setCVMidiChannel(value: number) {
    let result = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/CVMidiChannel/' + value.toString()
    );
    return result;
  }
  getCVMinHertz() {
    let value = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/CVMinHertz'
    );
    return value;
  }
  setCVMinHertz(value: number) {
    let result = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/CVMinHertz/' + value.toString()
    );
    return result;
  }
  getMidiDisplay() {
    let value = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/MidiDisplay'
    );
    return value;
  }
  setMidiDisplay(value: boolean) {
    // Web service take 0=false, 1 = true values
    let midiDisplayValue = 0;
    if (value) {
      midiDisplayValue = 1;
    }
    let result = this.http.get<string>(
      'http://' +
        Globals.HOSTANDPORT +
        '/MidiDisplay/' +
        midiDisplayValue.toString()
    );
    return result;
  }
  getMidiDefaultChannel() {
    let value = this.http.get<string>(
      'http://' + Globals.HOSTANDPORT + '/MidiDefaultChannel'
    );
    return value;
  }
  setMidiDefaultChannel(value: number) {
    let result = this.http.get<string>(
      'http://' +
        Globals.HOSTANDPORT +
        '/MidiDefaultChannel/' +
        value.toString()
    );
    return result;
  }
}
