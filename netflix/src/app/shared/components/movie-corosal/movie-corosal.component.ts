import { NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-corosal',
  imports: [NgFor],
  templateUrl: './movie-corosal.component.html',
  styleUrl: './movie-corosal.component.css',
  standalone: true
})
export class MovieCorosalComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() movies: number[] = []; 
  http = inject(HttpClient);

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  fullMovies: any[] = []; 

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies']) {
      console.log("Movies Updated:", this.movies); 
      this.fetchMovieDetails();  // Fetch movie details when movies change
    }
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private fetchMovieDetails() {
    const API_KEY = 'a55f8821d041d97b59437de4af51cfd1';
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
  
    if (!this.movies || this.movies.length === 0) return;
  
    const movieRequests = this.movies.map(movieId =>
      this.http.get(`${baseUrl}${movieId}?api_key=${API_KEY}`)
    );
  
    forkJoin(movieRequests).subscribe(movieDetails => {
      console.log("Fetched Movies:", movieDetails);
      this.fullMovies = movieDetails; 
      this.initSwiper(); // Reinitialize Swiper after updating movies
    });
  }

  private initSwiper() {
    setTimeout(() => {
      new Swiper(this.swiperContainer.nativeElement, {
        slidesPerGroup: 2,
        slidesPerView: 5,
      spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          600: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 5, centeredSlides: true },
          900: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 5, centeredSlides: true },
          1200: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 5, centeredSlides: false },
          1500: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 5, centeredSlides: false },
          1800: { slidesPerView: 5, slidesPerGroup: 6, spaceBetween: 5, centeredSlides: false },
        }
      });
    }, 500); // Delay to ensure movies are loaded before Swiper initialization
  }
}
