import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';


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
  

  constructor(private http: HttpClient,private globals : Globals) {}

  getSettings() {
    let value = this.http.get<Settings>(
      'http://' + this.globals.HOST + '/settings'
    );
    return value;
  }
}
