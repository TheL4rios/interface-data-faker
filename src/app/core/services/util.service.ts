import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  clon(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}