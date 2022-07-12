export const ENV = 'development';

export const API_BASE_URL_SERVER = 'https://pixl-server.herokuapp.com';
export const API_BASE_URL_LOCAL = 'http://localhost:5000';
export const API_BASE_URL = API_BASE_URL_LOCAL;

export const TOKEN_PIXLTEZ = 0;
export const TOKEN_INITCOIN = 1;

export enum DayPassToken {
  DayPass = 0,
  WeeklyPass = 1,
  YearlyPass = 2,
  SpecialEventPass = 3,
}

export enum PixlTokens {
  Pixltez = 0,
  InitCoin = 1,
}

export const Contracts = {
  Pixltez: 'KT1MRn2mPk9XLZibGpMdWv5yU7VhLAS58CpJ',
  PixlGame: 'KT1MQTLHYBBR8xNBQUs6wbXSfTfm9YhobWPT',
  DayPass: 'KT19jQhzpQNpsUrKYaRZQYapku8p8ML1FueD',
}

//export * from './environments.development'
export * from './environments.local'
