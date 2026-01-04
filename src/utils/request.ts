import { NuxoaApiError } from './errors.js';

export async function makeRequest<T>(
  baseUrl: string,
  customerId: string,
  apiKey: string,
  method: string,
  action: string,
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${baseUrl}/${customerId}/${apiKey}/${method}/${action}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  const data = await response.json();

  if (data.code && data.code !== 100 && data.code !== '100') {
    throw new NuxoaApiError(data.code, data.message, data);
  }

  return data;
}

export async function makePostRequest<T>(
  baseUrl: string,
  customerId: string,
  apiKey: string,
  method: string,
  action: string,
  params?: Record<string, any>
): Promise<T> {
  const url = new URL(`${baseUrl}/${customerId}/${apiKey}/${method}/${action}`);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: params ? JSON.stringify(params) : undefined,
  });

  const data = await response.json();

  if (data.code && data.code !== 100 && data.code !== '100') {
    throw new NuxoaApiError(data.code, data.message, data);
  }

  return data;
}
