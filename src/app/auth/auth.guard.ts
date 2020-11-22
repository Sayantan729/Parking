import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppData } from '../app.details';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private appData:AppData){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      if( localStorage.getItem("email")===null)
      {
        this.router.navigate(['signin']);
        return false;
      }
      else
      return true;
    
  }
  
}
