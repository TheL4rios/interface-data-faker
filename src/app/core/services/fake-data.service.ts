import { Injectable } from '@angular/core';
import { IInterface } from '../interfaces/temporal-interface.interface';
import { randEmail, randFullName, randNumber, randPastDate, randWord } from '@ngneat/falso';
import { FakeData, GenericData } from '../interfaces/fake-data.interface';
import { Types } from '../enums/key-words.enum';
import { UtilService } from './util.service';
import { SpecificFakeDataService } from './specific-fake-data.service';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

  private data: FakeData[] = [];
  private interfaces: IInterface[] = [];

  private limitArray = 1;

  constructor(
    private util: UtilService,
    private specificFakeDataService: SpecificFakeDataService
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

  private addInterface(currenInterface: IInterface): FakeData {
    const temporalData: FakeData = {
      name: currenInterface.interfaceName,
      data: []
    }

    Array(this.limitArray).fill(null).forEach(_ => {
      const body: GenericData = {};
      for (const propertie of currenInterface.properties) {
        body[propertie.keyName] = this._getData(propertie.keyType as Types, propertie.isArray);
      }
      temporalData.data.push(body);
    });

    return temporalData;
  }

  private _getData(type: Types, isArray: boolean): any {
    if (type == 'any') {
      return this.getArrayData(randWord, isArray);
    }

    if (type == 'Date') {
      return this.getArrayData(randPastDate, isArray);
    }

    if (type == 'boolean') {
      return this.getArrayData(() => Math.random() > 0.5, isArray);
    }

    if (type == 'number') {
      return this.getArrayData(randNumber, isArray);
    }

    if (type == 'string') {
      return this.getArrayData(randWord, isArray);
    }

    if (this.util.isValidVariable(type)) {
      const exists = this.interfaces.find(_interface => _interface.interfaceName == type);

      return this.getArrayData(() => {
        const body: GenericData = {};

        if (!!exists) {
          for (const propertie of exists.properties) {
            body[propertie.keyName] = this._getData(propertie.keyType as Types, propertie.isArray);
          }
        } else {
          return this.specificFakeDataService.getData(type);
        }
        return body;
      }, isArray);
    }
  }

  private getArrayData(callback: Function, isArray: boolean) {
    if (isArray) {
      return Array(this.limitArray).fill(null).map(_ => callback());
    }

    return callback();
  }
}
