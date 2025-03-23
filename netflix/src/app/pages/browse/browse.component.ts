import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieServiceService } from '../../shared/services/movie-service.service';
import { MovieCorosalComponent } from '../../shared/components/movie-corosal/movie-corosal.component';
import { videoInterface } from '../../shared/models/video.interface';

@Component({
  selector: 'app-browse',
  imports: [HeaderComponent,BannerComponent,MovieCorosalComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService)
  movieService = inject(MovieServiceService)

  popularMOvies:number[]=[]
  // ngOnInit(): void {
  //   this.movieService.getMovies()
  //   .subscribe(res=>{
  //     console.log(res)
  //     this.popularMOvies = res.results
  //   })
  // }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((res: any) => {
      console.log("Full Response:", res); 
      console.log("Parent - Fetched Movie IDs:", res.results.map((movie: any) => movie.id)); 
      
      this.popularMOvies = res.results.map((movie: any) => movie.id);
    });
  }


  signOut(){
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name



}
