export interface IInterface {
    interfaceName: string;
    properties: IPropertie[];
}

export interface IPropertie {
    keyName: string;
    keyType: string;
    isArray: boolean;
}