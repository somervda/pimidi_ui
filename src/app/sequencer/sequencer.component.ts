import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sequencer',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './sequencer.component.html',
  styleUrl: './sequencer.component.scss',
})
export class SequencerComponent {
  noteOn$$: Subscription | undefined;
  noteOff$$: Subscription | undefined;
  midiReset$$: Subscription | undefined;
  playingNote: number = -1;

  constructor(private playerService: PlayerService) {}

  noteOn(event: Event): void {
    let midiNote = parseInt((event.target as Element).id) + 50;
    if (this.playingNote != -1) {
      // If a note is still playing turn it off
      this.noteOff$$ = this.playerService
        .midiNoteOff(this.playingNote)
        .subscribe(() => {});
      this.playingNote = -1;
    }
    console.log('Note On:', midiNote);
    this.noteOn$$ = this.playerService.midiNoteOn(midiNote).subscribe(() => {});
    this.playingNote = midiNote;
  }
  noteOff(event: Event): void {
    let midiNote = parseInt((event.target as Element).id) + 50;
    console.log('Note Off:', midiNote);
    this.noteOff$$ = this.playerService
      .midiNoteOff(midiNote)
      .subscribe(() => {});
  }

  midiReset(): void {
    this.midiReset$$ = this.playerService.midiNoteReset().subscribe(() => {});
  }
}
