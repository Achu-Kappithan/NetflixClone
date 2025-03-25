import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowPrivewService {

  private selectedMovieSource  =new BehaviorSubject<any>(null);
  selectedMove$ = this.selectedMovieSource.asObservable()

  setSelectedMove(movie:any){
    this.selectedMovieSource.next(movie)
  }
  
}
