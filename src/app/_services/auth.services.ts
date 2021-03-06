import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//check the login and registration authentication service using the url from server side handle it here

@Injectable()
export class AuthService {

  //Base URL
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
  private _getRoleByID = this.baseUrl+"/role/get-role-info-id"//get //:roleId
  private _updateRoleByID = this.baseUrl+"/role/update-role-info" //:roleId //put
  private _deleteRoleByID = this.baseUrl+"/role/delete-role-info" //:roleId //delete

  //Features APIs
  private _setFeature = this.baseUrl+"/feature/adding-feature" //post
  private _getFeatures = this.baseUrl+"/feature/get-feature"//get
  private _getFeatureById = this.baseUrl+"/feature/get-feature-by-id"//featureid //get
  private _updateFeatureById = this.baseUrl+"/feature/update-feature" //featureid //put
  private _deleteFeatureById = this.baseUrl+"/feature/delete-feature" //featureid //delete

  


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



  /////////////////////Role APIs ///////////////////////////

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

 getRoleByID(rId){
   console.log(rId);
  return this.http.get<any>(`${this._getRoleByID}/${rId}`)
 }

 updateRole(rId,role) {
  return this.http.put<any>(`${this._updateRoleByID}/${rId}`, role) 
}

removeRole(rId){
  return this.http.delete(`${this._deleteRoleByID}/${rId}`)
}


 /////////////////////Feature APIs ///////////////////////////

 assignFeature(feature) {
  return this.http.post<any>(this._setFeature, feature)
}

getAllFeatures() {
  return this.http.get<any>(this._getFeatures)
}

getFeatureByID(fId){
 console.log(fId);
return this.http.get<any>(`${this._getFeatureById}/${fId}`)
}

updateFeature(fId,feature) {
return this.http.put<any>(`${this._updateFeatureById}/${fId}`, feature) 
}

removeFeature(fId){
return this.http.delete(`${this._deleteFeatureById}/${fId}`)
}

}