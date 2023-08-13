import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConst } from 'src/app/pages/constants/url-const';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(public router: Router) {}

  /**
   * navigate
   */
  public navigate(path: string) {
    this.router.navigate([UrlConst.SLASH + path]);
  }
}
