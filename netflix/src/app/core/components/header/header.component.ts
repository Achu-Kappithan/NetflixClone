import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  name:string = ""
  profile: string = ""
  ngOnInit(): void {
   const user = JSON.parse(sessionStorage.getItem("loggedInUser")!)
   if(user){
    console.log(user)
    this.name  = user.name
    this.profile = user.picture 
   }
  }
  naveList = ["home", "Tv Shows", "News & Popular" , "My List", "Browse By Language"]

  auth = inject(AuthService)

  signOut(){
    sessionStorage.removeItem('loggedInUser')
    this.auth.signOut()
  }

}
