import { Component, inject, OnInit } from '@angular/core';
import { ShowPrivewService } from '../../../shared/services/show-privew.service';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-banner',
  imports: [NgIf],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  standalone: true,
})
export class BannerComponent implements OnInit {
  private http = inject(HttpClient);
  private moveServices = inject(ShowPrivewService);
  private sanitizer = inject(DomSanitizer);
  private viewportScroller = inject(ViewportScroller);

  selectedMovie: any = null;
  videoUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    this.moveServices.selectedMove$.subscribe((movie) => {
      this.selectedMovie = movie;
      if (movie) {
        this.fetchMovieVideos(movie.id);
        this.viewportScroller.scrollToPosition([0, 0]);
      } else {
        this.videoUrl = null;
      }
    });
  }

  fetchMovieVideos(movieId: number): void {
    const API_KEY = 'a55f8821d041d97b59437de4af51cfd1';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    this.http.get<{ results: any[] }>(url).subscribe({
      next: (response) => {
        const trailer = this.findTrailer(response.results);
        this.videoUrl = trailer
          ? this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}&controls=0`
            )
          : null;
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
        this.videoUrl = null;
      },
    });
  }

  private findTrailer(videos: any[]): any | null {
    const officialTrailer = videos.find(
      (video) =>
        video.name.toLowerCase().includes('official trailer') &&
        video.site === 'YouTube'
    );
    return (
      officialTrailer ||
      videos.find((video) => video.site === 'YouTube') ||
      null
    );
  }
}
