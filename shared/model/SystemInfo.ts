export interface SystemInfoResponse {
  last_updated: number;
  ttl: number;
  data: SystemInfo;
}

export interface SystemInfo {
  system_id: string;
  language: string;
  name: string;
  operator: string;
  timezone: string;
  phone_number: string;
  email: string;
}
