import { Component, OnDestroy } from '@angular/core';
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
export class SequencerComponent implements OnDestroy {
  noteOn$$: Subscription | undefined;
  noteOff$$: Subscription | undefined;
  midiReset$$: Subscription | undefined;

  constructor(private playerService: PlayerService) {}

  noteOn(event: Event): void {
    let midiNote = parseInt((event.target as Element).id) + 40;
    console.log('Note On:', midiNote);
    this.noteOn$$ = this.playerService.midiNoteOn(midiNote).subscribe(() => {});
  }
  noteOff(event: Event): void {
    let midiNote = parseInt((event.target as Element).id) + 40;
    console.log('Note Off:', midiNote);
    this.noteOff$$ = this.playerService
      .midiNoteOff(midiNote)
      .subscribe(() => {});
  }

  midiReset(): void {
    this.midiReset$$ = this.playerService.midiNoteReset().subscribe(() => {});
  }

  ngOnDestroy(): void {
    if (this.midiReset$$) {
      this.midiReset$$.unsubscribe();
    }
    if (this.noteOn$$) {
      this.noteOn$$.unsubscribe();
    }
    if (this.noteOff$$) {
      this.noteOff$$.unsubscribe();
    }
  }
}
