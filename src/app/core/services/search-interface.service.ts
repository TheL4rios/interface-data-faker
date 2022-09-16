import { Injectable } from '@angular/core';
import { reservedKeywords, reservedTypes } from '../constant/reserved-keywords';
import { KeyWord } from '../enums/key-words.enum';
import { IPropertie, IInterface } from '../interfaces/temporal-interface.interface';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class SearchInterfaceService {

  private i = 0;
  private tokens: string[] = [];
  private token: string = '';
  private hashTable: IInterface[] = [];
	private temporalInterface: IInterface = {
    interfaceName: '',
    properties: []
  };
  private interfaceBody: IPropertie = {
    keyName: '',
    keyType: '',
    isArray: false,
  };

  constructor(
    private utilService: UtilService
  ) { }

  private _reset(resetAll = true) {
    if (resetAll) {
      this.i = 0;
      this.token = '';
      this.hashTable = [];
    }

    this.temporalInterface = {
      interfaceName: '',
      properties: []
    };
    this.interfaceBody = {
      keyName: '',
      keyType: '',
      isArray: false,
    }
  }

  getInterfaces(tokens: string[]) {
    this.tokens = tokens;
    this._reset();

    while(this.tokens[this.i]) {
      this.token = this.tokens[this.i];
      if (this.token == KeyWord.INTERFACE) {
        this.i++;
        this._q1();
      }

      this._reset(false);
      this.i++;
    }

    return this.hashTable;
  }

  private _q1() {
    this.token = this.tokens[this.i];
    if (this.utilService.isValidKeyName(this.token)) {
      this.i++;
      this.temporalInterface.interfaceName = this.token;
      this._q2();
    }
  }

  private _q2() {
    this.token = this.tokens[this.i];
    if (this.token == '{') {
      this.i++;
      this._q3();
    }
  }

  private _q3() {
    this.interfaceBody = {
      isArray: false,
      keyName: '',
      keyType: ''
    };

    this.token = this.tokens[this.i];
    if (this.utilService.isValidKeyName(this.token)) {
      this.i++;
      this.interfaceBody.keyName = this.token;
      this._q4();
    }
  }

  private _q4() {
    this.token = this.tokens[this.i];
    if (this.token == ':') {
      this.i++;
      this._q5();
    }
  }

  private _q5() {
    this.token = this.tokens[this.i];
    if (this.utilService.isValidKeyName(this.token) || reservedTypes.includes(this.token)) {
      this.i++;
      this.interfaceBody.keyType = this.token;

      if (this.tokens[this.i] == '[') {
        this._q8();
      } else {
        this._q6();
      }
    }
  }

  private _q6() {
    this.token = this.tokens[this.i];
    if (this.token == ';') {
      this.i++;
      this.temporalInterface.properties.push(this.utilService.clon(this.interfaceBody));
      this.token = this.tokens[this.i];
      if (this.utilService.isValidKeyName(this.token)) {
        this._q3();
      } else if (this.token == '}') {
        this.hashTable.push(this.utilService.clon(this.temporalInterface));
      }
    }
  }

  private _q8() {
    this.token = this.tokens[this.i];
    if (this.token == '[') {
      this.i++;
      this.token = this.tokens[this.i];
      if (this.token == ']') {
        this.i++;
        this.interfaceBody.isArray = true;
        this._q6();
      }
    }
  }
}
