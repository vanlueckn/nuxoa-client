export interface ApiResponse<T = any> {
  code: string | number;
  message: string;
  data?: T;
}

export interface SuccessResponse {
  success: boolean;
}

export type OperatingSystem =
  | 'Debian 12'
  | 'Debian 11'
  | 'Ubuntu 22.10'
  | 'Ubuntu 22.04'
  | 'Windows Server 2022'
  | 'Windows Server 2019';

export type GraphPeriod = 'hour' | 'day' | 'week' | 'month' | 'year';

export interface Price {
  net: number;
  gross: number;
}
