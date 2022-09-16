import { Injectable } from '@angular/core';
import { IInterface } from '../interfaces/temporal-interface.interface';
import { randEmail, randFullName, randNumber, randPastDate, randWord } from '@ngneat/falso';
import { FakeData, GenericData } from '../interfaces/fake-data.interface';
import { Types } from '../enums/key-words.enum';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  private data: FakeData[] = [];
  private interfaces: IInterface[] = [];

  private limitArray = 10;
  private limitInternalArray = 20;

  constructor(
    private util: UtilService
  ) { }

  getFakeData(interfaces: IInterface[]) {
    this.interfaces = interfaces;
    this.data =  [];

    for (const currentInterface of interfaces) {
      const temporalData = this.addInterface(currentInterface);
      this.data.push(this.util.clon(temporalData));
    }

    return this.data;
  }

  private addInterface(interfaces: IInterface): FakeData {
    const temporalData: FakeData = {
      name: interfaces.interfaceName,
      data: []
    }

    const body: GenericData = {};
    for (const propertie of interfaces.properties) {
      body[propertie.keyName] = this._getData(propertie.keyType as Types, propertie.isArray);
    }
    temporalData.data.push(body);

    return temporalData;
  }

  private _getData(type: Types, isArray: boolean): any {
    if (type == 'any') {
      if (isArray) {
        return Array(this.limitArray).fill(null).map(x => randWord());
      }
      return randWord();
    }

    if (type == 'Date') {
      if (isArray) {
        return Array(this.limitArray).fill(null).map(x => randPastDate());
      }
      return randPastDate();
    }

    if (type == 'boolean') {
      if (isArray) {
        return Array(this.limitArray).fill(null).map(x => Math.random() > 0.5);
      }
      return Math.random() > 0.5;
    }

    if (type == 'number') {
      if (isArray) {
        return Array(this.limitArray).fill(null).map(x => randNumber());
      }
      return randNumber();
    }

    if (type == 'string') {
      if (isArray) {
        return Array(this.limitArray).fill(null).map(x => randWord());
      }
      return randWord();
    }

    if (this.util.isValidVariable(type)) {
      const exists = this.interfaces.find(_interface => _interface.interfaceName == type);

      const body: GenericData = {};

      if (!!exists) {
        if (isArray) {
          return Array(this.limitInternalArray).fill(null).map(x => {
            const body: GenericData = {};
            for (const propertie of exists.properties) {
              body[propertie.keyName] = this._getData(propertie.keyType as Types, propertie.isArray);
            }
            return body;
          });
        }

        for (const propertie of exists.properties) {
          body[propertie.keyName] = this._getData(propertie.keyType as Types, propertie.isArray);
        }
      }
      return body;
    }
  }
}
