declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private router = inject(Router)
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '933059534049-q8m2sg4ec9ou5q0ehg9k1ed7mq0hbcpt.apps.googleusercontent.com',
      callback:(resp:any)=>this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      size: 'large',
      shape: "rectangle",
      width :350
    })
  }

  private decodeToken(tocken:string){
    return JSON.parse(atob(tocken.split(".")[1]))
  }
 
  handleLogin(responce:any){
    if(responce){
      //decode the tocken 
      const payload = this.decodeToken(responce.credential)
      //store in the section
      sessionStorage.setItem("loggedInUser",JSON.stringify(payload));
      //navigate to the home /browsetr
      this.router.navigate(['browse'])
    }
  }

}
