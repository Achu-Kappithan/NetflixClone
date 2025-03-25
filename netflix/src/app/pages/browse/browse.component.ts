import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieServiceService } from '../../shared/services/movie-service.service';
import { MovieCorosalComponent } from '../../shared/components/movie-corosal/movie-corosal.component';

@Component({
  selector: 'app-browse',
  imports: [HeaderComponent,BannerComponent,MovieCorosalComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService)
  movieService = inject(MovieServiceService);

  popularMOvies:number[] = []
  topRatedMovies: any[] = [];
  upcoming: number[] = [];


  ngOnInit(): void {
    this.movieService.getMovies().subscribe((res: any) => {
      console.log("getmovie - Fetched Movie IDs:", res.results.map((movie: any) => movie.id)); 
      
      this.popularMOvies = res.results.map((movie: any) => movie.id);
    });

    this.movieService.getTopRated().subscribe((res: any) => {
      console.log("popular - Fetched Movie IDs:", res.results.map((movie: any) => movie.id)); 
      
      this.topRatedMovies = res.results.map((movie: any) => movie.id);
    });

    this.movieService.upComing().subscribe((res: any) => {
      console.log("tvshow - Fetched Movie IDs:", res.results.map((movie: any) => movie.id)); 
      
      this.upcoming = res.results.map((movie: any) => movie.id);
    });
  }

  signOut(){
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }

}
