import { Injectable } from '@angular/core';
import { reservedKeywords } from '../constant/reserved-keywords';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private regexVariable = /^[a-zA-z]+[0-9]*/;

  constructor() { }

  clon(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  isValidKeyName(token: string): boolean {
    return !reservedKeywords.includes(token) && this.isValidVariable(token);
  }

  isValidVariable(token: string): boolean {
    return this.regexVariable.test(token);
  }
}
