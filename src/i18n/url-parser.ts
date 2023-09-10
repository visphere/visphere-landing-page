/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';

export const i18nHref = (originalUrl: string, lang: string): string => {
  if (lang === environment.i18nDefaultLocale) {
    return originalUrl;
  }
  return `/${lang}${originalUrl}`;
};

export const i18nSeoHref = (originalUrl: string, lang: string): string => {
  if (lang === environment.i18nDefaultLocale) {
    return originalUrl;
  }
  return `${originalUrl}/${lang}`;
};

export const i18nClientHref = (originalUrl: string, lang: string): string => {
  return `${originalUrl}?lang=${lang}`;
};

export const i18nWithoutLangPrefixHref = (
  originalUrl: string,
  lang: string
): string => {
  if (lang === environment.i18nDefaultLocale) {
    return originalUrl.replace(/\/(en|pl)/i, '') || '/';
  }
  return `${lang}${originalUrl}`;
};
