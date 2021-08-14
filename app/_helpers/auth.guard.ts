import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private authenticationService:AuthenticationService)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const user=this.authenticationService.userValue;
    if(user)
    
    return true;
    else
    {
      this.router.navigate([ '/login'],{queryParams:{returnUrl:state.url}})
      return false;
    
    }
    
  }
  
}
