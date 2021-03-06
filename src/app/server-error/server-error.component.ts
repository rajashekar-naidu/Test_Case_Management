import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.services';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  uId = this._auth.getuId();

  constructor(private appService: AppService, private _auth:AuthService, private _router:Router) {
    this.appService.pageTitle = '500 Server Not Found';
   }

  ngOnInit() {
    this.getUserName(this.uId)
  }

  getUserName(uId){
    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        if(data)
        // console.log(data);
        this._router.navigate(['/dashboard']);
      },
      error => {

        if(error.name === "HttpErrorResponse")
          this._router.navigate(['/server-error']);
      });
  }

}
