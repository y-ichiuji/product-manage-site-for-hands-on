import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  static setItem<T>(key: string, t: T): void {
    sessionStorage.setItem(key, JSON.stringify(t));
  }

  static getItem<T>(key: string, t: T): T {
    return JSON.parse(sessionStorage.getItem(key) as string) as T;
  }

  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
