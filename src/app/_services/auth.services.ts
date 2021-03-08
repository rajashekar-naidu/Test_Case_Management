import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//check the login and registration authentication service using the url from server side handle it here

@Injectable()
export class AuthService {

  //Base URL
  private baseUrl="http://192.168.1.139:3000";



  //user APIs
  private _registerUrl = this.baseUrl+"/user/add-user";//post
  private _loginUrl = this.baseUrl+"/user/add-login";//post
  private _allUsers = this.baseUrl+"/user/get-all";//get
  private _userDetailsByID = this.baseUrl+"/user/get";//get  /:userId
  private _updateUserByID = this.baseUrl+"/user/update";//put  // /:userId
  private _removeUserByID = this.baseUrl+"/user/remove";//delete
  private _getAllLogs = this.baseUrl+"/user/get-logs";//get
  private _getLogsByID = this.baseUrl+"/user/get-log";//get
  private _logoutByID = this.baseUrl+"/user/get-logout"; //get
  private _changePassword = this.baseUrl+"/user/change-password"; //post
  private _dashboard = this.baseUrl+"/user/get-dashboard"; //get


  //Project APIs

  private _setProject = this.baseUrl+"/project/add"//post
  private _getProjects = this.baseUrl+"/project/get-all"//get
  private _getProjectByID = this.baseUrl+"/project/get"//get //:projectId
  private _updateProjectByID = this.baseUrl+"/project/update" //:projectId //put
  private _deleteProjectByID = this.baseUrl+"/project/remove" //:projectId //delete


  //Report APIs

  private _setReport = this.baseUrl+"/Report/add"//post
  private _getReports = this.baseUrl+"/Report/get-all"//get
  private _getReportByID = this.baseUrl+"/Report/get"//get //:reportId
  private _updateReportByID = this.baseUrl+"/Report/update" //:reportId //put
  private _deletePReportByID = this.baseUrl+"/Report/remove" //:reportId //delete


  //Role APIs
  private _setRole = this.baseUrl+"/role/add"//post
  private _getRoles = this.baseUrl+"/role/get-all"//get
  private _getRoleByID = this.baseUrl+"/role/get"//get //:roleId
  private _updateRoleByID = this.baseUrl+"/role/update" //:roleId //put
  private _deleteRoleByID = this.baseUrl+"/role/remove" //:roleId //delete

  //Features APIs
  private _setFeature = this.baseUrl+"/feature/add" //post
  private _getFeatures = this.baseUrl+"/feature/get-all"//get
  private _getFeatureById = this.baseUrl+"/feature/get"//featureid //get
  private _updateFeatureById = this.baseUrl+"/feature/update" //featureid //put
  private _deleteFeatureById = this.baseUrl+"/feature/remove" //featureid //delete

  


  constructor(private http: HttpClient, private _router: Router) { }


/////////////////////user APIs ///////////////////////////

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    console.log(user);
    return this.http.post<any>(this._loginUrl, user)
  }

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

  userLogs(){
    return this.http.get<any>(this._getAllLogs) 
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


  
  /////////////////////Project, Runlog, Testcase APIs ///////////////////////////

  assignProject(project) {
    console.log(project);
    
    return this.http.post<any>(this._setProject, project)
  }

  assignRunlog(runlog) {
    return this.http.post<any>(this._setProject, runlog)
  }

  assignTestcase(testcase) {
    return this.http.post<any>(this._setProject, testcase)
  }


  getAllProjects() {
    return this.http.get<any>(this._getProjects)
 }

 getProjectByID(pId){
   console.log(pId);
  return this.http.get<any>(`${this._getProjectByID}/${pId}`)
 }

 updateProject(pId,project) {
  return this.http.put<any>(`${this._updateProjectByID}/${pId}`, project) 
}

removeProject(pId){
  return this.http.delete(`${this._deleteProjectByID}/${pId}`)
}

  /////////////////////Report APIs ///////////////////////////

  assignReport(report) {
    return this.http.post<any>(this._setReport, report)
  }

  getAllReports() {
    return this.http.get<any>(this._getReports)
 }

 getReportByID(repId){
   console.log(repId);
  return this.http.get<any>(`${this._getReportByID}/${repId}`)
 }

 updateReport(repId,report) {
  return this.http.put<any>(`${this._updateReportByID}/${repId}`, report) 
}

removeReport(repId){
  return this.http.delete(`${this._deletePReportByID}/${repId}`)
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