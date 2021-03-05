import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//check the login and registration authentication service using the url from server side handle it here

@Injectable()
export class AuthService {

  //Base URL
  //private baseUrl="http://localhost:5000";
  private baseUrl="http://192.168.1.139:9000";



  //user APIs
  private _registerUrl = this.baseUrl+"/user/register";//post
  private _loginUrl = this.baseUrl+"/user/login";//post
 // private _googleAuth = this.baseUrl+"/user/google"//get 
  private _allUsers = this.baseUrl+"/user/all-user/list";//get
  private _userDetailsByID = this.baseUrl+"/user/user-by-id";//get  /:userId
  private _updateUserByID = this.baseUrl+"/user/user-update";//put  // /:userId
  private _removeUserByID = this.baseUrl+"/user/user-remove";//delete
  //private _getAllLogs = this.baseUrl+/user/get-all-log;//get
  private _getLogsByID = this.baseUrl+"/user/get-log";//get
  private _logoutByID = this.baseUrl+"/user/logout"; //get
  private _changePassword = this.baseUrl+"/user/update-password"; //post
  private _dashboard = this.baseUrl+"/user/dashboard"; //get



  //Role APIs
  private _setRole = this.baseUrl+"/role/role-info"//post
  private _getRoles = this.baseUrl+"/role/get-role-info"//get
  private _getRoleByID = this.baseUrl+"/role/get-role-info-id"//get //:userId

  


  constructor(private http: HttpClient, private _router: Router) { }


/////////////////////user APIs ///////////////////////////

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    console.log(user);
    return this.http.post<any>(this._loginUrl, user)
  }

  // googleOAth(){
  //   return this.http.get<any>(this._googleAuth, {
  //     headers: new HttpHeaders({
  //          'Content-Type':  'application/json',
  //        })
  //     }
  //     );
  // }

  getDashboard(){
     return this.http.get<any>(this._dashboard)
  }

  getAllUsers() {
     return this.http.get<any>(this._allUsers)
  }

  getUserDetails(uId){
    console.log(uId);
    return this.http.get<any>(`${this._userDetailsByID}/${uId}`)
  }
  
  updateUser(uId,user) {
    return this.http.put<any>(`${this._updateUserByID}/${uId}`, user) 
  }


  removeUser(uId){
    return this.http.delete(`${this._removeUserByID}/${uId}`)
  }

  changePassword(password) {
    return this.http.post<any>(this._changePassword, password) 
  }

  logoutUser(){  
    return this.http.get<any>(this._logoutByID) 
  }

  userLogsByID(uId){
    return this.http.get<any>(`${this._getLogsByID}/${uId}`) 
  }

  isAuthenticated(){
    return localStorage.getItem('token') 
  }

  getToken() { //check if this is needed
    return   localStorage.getItem('token')
  }
  
  getuId(){ //check if this is needed
    return localStorage.getItem('uId');
  }



  /////////////////////role and Designation APIs ///////////////////////////

  getRole(){ 
    if(localStorage.getItem('role') === "Admin")
      return "Admin";
    if(localStorage.getItem('role') === "User")
      return "User";
    else
    return false;
  }

  assignRole(role) {
    return this.http.post<any>(this._setRole, role)
  }

  getAllRoles() {
    return this.http.get<any>(this._getRoles)
 }

 getRoleByID(uid){
   console.log(uid);
  return this.http.get<any>(`${this._getRoleByID}/${uid}`)
 }
}