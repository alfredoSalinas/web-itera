import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ = new Observable()
  subscription!: Subscription
  isLogged: boolean = false
  foto: string = ''

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.user$ = this.auth.getUser()
    this.subscription = this.auth.getUser().subscribe(user=>{
      if(user){
        this.isLogged = true
        this.foto = user.photoURL!
      }else{
        this.isLogged = false
      }
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  login(){
    this.auth.login()
  }

  logout(){
    this.auth.logout()
  }

}
