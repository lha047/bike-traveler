export interface GeneralInfoResponse {
  data: Data;
  ttl: number;
  last_updated: number;
}

export interface Data {
  nb: Nb;
}

export interface Nb {
  feeds: Feed[];
}

export interface Feed {
  url: string;
  name: string;
}
