import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  midiNoteOn(note: number) {
    let result = this.http.get<boolean>(
      'http://' + Globals.HOSTANDPORT + '/midiNoteOn/' + note.toString()
    );
    return result;
  }
  midiNoteOff(note: number) {
    let result = this.http.get<boolean>(
      'http://' + Globals.HOSTANDPORT + '/midiNoteOff/' + note.toString()
    );
    return result;
  }

  midiNoteReset() {
    let result = this.http.get<boolean>(
      'http://' + Globals.HOSTANDPORT + '/midiNoteReset'
    );
    return result;
  }
}
