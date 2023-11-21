import { Component } from '@angular/core';
import { MusicaService } from 'src/app/services/musica.service';

@Component({
  selector: 'app-musicalista',
  templateUrl: './musicalista.page.html',
  styleUrls: ['./musicalista.page.scss'],
})
export class MusicalistaPage {

  constructor(private musicaService: MusicaService) { }

  songs: any[] = [];
  searchQuery: string = '';
  selectedSong: any = null;

  searchSongs() {
    this.musicaService.searchSongs(this.searchQuery).subscribe((data: any) => {
      this.songs = data.results.trackmatches.track;
      console.log('Songs:', this.songs);
    }, error => {
      console.error('Error fetching songs:', error);
    });
  }

  selectSong(song: any) {
    this.selectedSong = song;
    this.songs = this.songs.filter(s => s !== song);
  }
}