export interface PrefillAttributes {
  nameFirst: string;
  nameLast: string;
  birthdate: string;
  addressStreet1: string;
  addressStreet2: string;
  addressCity: string;
  addressSubdivision: string;
  addressPostalCode: string;
  countryCode: string;
}

export interface ClientError {
  status: number;
  code: string;
  message: string;
}
