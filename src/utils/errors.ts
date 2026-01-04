export class NuxoaApiError extends Error {
  constructor(
    public code: number | string,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'NuxoaApiError';
  }
}
