export interface IDataResponse {
  value: number;
  year: number;
  month: number;
}

export interface IParams {
  metric: MetricValue;
  location: WLocation;
}

export enum MetricValue {
  Rainfall = 'Rainfall',
  Tmax = 'Tmax',
  Tmin = 'Tmin',
}

export enum WLocation {
  England = 'England',
  UK = 'UK',
  Wales = 'Wales',
  Scotland = 'Scotland',
}

export interface IDataSet {
  date: string;
  tmin: number;
  tmax: number;
  rain: number;
}

export interface ILocationDrop {
  value: WLocation;
  label: string;
}
