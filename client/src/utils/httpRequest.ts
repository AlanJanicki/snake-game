import { FormData, RequestMethod, Url, UserData } from '../models';

export const httpRequest = async <T>(
  method: RequestMethod,
  path: string,
  data?: Partial<FormData> | { [UserData.GAMELEVEL]?: number }
): Promise<T> => {
  const res = await fetch(`${Url.SERVER}${path}`, {
    method,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  const resJson = await res.json();

  if (!res.ok) {
    throw resJson;
  }

  return resJson;
};
