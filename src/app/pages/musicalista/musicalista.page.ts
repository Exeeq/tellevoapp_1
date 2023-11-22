import { Component } from '@angular/core';
import { MusicaService } from 'src/app/services/musica.service';

@Component({
  selector: 'app-musicalista',
  templateUrl: './musicalista.page.html',
  styleUrls: ['./musicalista.page.scss'],
})
export class MusicalistaPage {

  constructor(private musicaService: MusicaService) { }

  availableSongs: any[] = [];
  selectedSongs: any[] = [];
  searchQuery: string = '';

  onSearchChange() {
    if (!this.searchQuery) {
      this.availableSongs = [];
      this.selectedSongs = [];
    } else {
      this.searchSongs();
    }
  }

  searchSongs() {
    this.musicaService.searchSongs(this.searchQuery).subscribe((data: any) => {
      this.availableSongs = data.results.trackmatches.track;
      console.log('Available Songs:', this.availableSongs);
    }, error => {
      console.error('Error fetching songs:', error);
    });
  }

  selectSong(song: any) {
    this.selectedSongs.push(song);
    this.availableSongs = this.availableSongs.filter(s => s !== song);
  }
}