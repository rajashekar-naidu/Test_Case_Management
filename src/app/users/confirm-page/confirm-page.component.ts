import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/_services/auth.services';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.scss']
})
export class ConfirmPageComponent implements OnInit {
  constructor(private _appService: AppService, private _router:Router, private _auth:AuthService) { 
    this._appService.pageTitle = 'confirm page';
  }

  ngOnInit() {
    // if(this._auth.getRole()==="User")
    //   this._router.navigate(['/shorturl']);
    // if(this._auth.getRole()===false)
    //   this._router.navigate(['/']);
  }

  submit(){
    this._router.navigate(['/user-accounts']);
  }
}


