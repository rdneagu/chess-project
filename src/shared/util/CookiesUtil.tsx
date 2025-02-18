import Cookies from 'js-cookie';

export function getCookie<T = string>(name: string): T | undefined {
  const cookie = Cookies.get(name);
  if (!cookie) {
    return undefined;
  }
  const decodedCookie = decodeURIComponent(cookie);

  try {
    return JSON.parse(decodedCookie) as T;
  } catch (e) {
    return decodedCookie as T;
  }
}

export function setCookie<T>(name: string, value: T): void {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  const stringValue = typeof value !== 'string' ? JSON.stringify(value) : value;
  Cookies.set(name, encodeURIComponent(stringValue), { path: '/', expires: date });
}

export function removeCookie(name: string): void {
  Cookies.remove(name, { path: '/' });
}
