import { NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DiscriptionPipe } from '../../pipes/discription.pipe';
import { ShowPrivewService } from '../../services/show-privew.service';


@Component({
  selector: 'app-movie-corosal',
  imports: [NgFor,DiscriptionPipe],
  templateUrl: './movie-corosal.component.html',
  styleUrl: './movie-corosal.component.css',
  standalone: true
})
export class MovieCorosalComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() movies: number[] = []; 
  @Input() category: 'popular' | 'top_rated' | 'trending' = 'popular'
  http = inject(HttpClient);
  showPrivew =inject(ShowPrivewService)

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  fullMovies: any[] = []; 

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies']) {
      this.fetchMovieDetails();  
    }
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  private fetchMovieDetails() {
    const API_KEY = 'a55f8821d041d97b59437de4af51cfd1';
    const baseUrl = 'https://api.themoviedb.org/3/movie/';
  
    if (!this.movies) return;
  
    const movieRequests = this.movies.map(movieId =>
      this.http.get(`${baseUrl}${movieId}?api_key=${API_KEY}`)
    );
  
    forkJoin(movieRequests).subscribe(movieDetails => {
      this.fullMovies = movieDetails; 
      if (this.fullMovies.length > 0) {
        this.showPrivew.setSelectedMove(this.fullMovies[0]);
      }
      this.initSwiper(); 
    });
  }

  playMovie(movie:any){
    this.showPrivew.setSelectedMove(movie)
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
    }, 500); 
  }
}
