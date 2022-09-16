export interface FakeData {
    name: string;
    data: GenericData[];
}

export interface GenericData {
    [key: string]: any;
}