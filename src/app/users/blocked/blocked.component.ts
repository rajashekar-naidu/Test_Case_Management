import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {

  ngOnInit() {
    if(this._auth.getRole()===false)
      this._router.navigate(['/']);
  }
  

  constructor(private _appService: AppService, private _router:Router, private _auth:AuthService) {
    this._appService.pageTitle = 'Blocked';
   }

 
  submit(){
    this._router.navigate(['/']);
  }
}
