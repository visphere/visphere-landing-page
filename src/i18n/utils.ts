/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { getLocale } from 'astro-i18n-aut';
import { environment } from '~/env/environment';

export const getSafetyLocaleSSR = (
  url: URL
): { locale: string; lang: string } => {
  const { i18nDefaultLocale, i18nLocalesMap } = environment;
  let localeId: string = getLocale(url)!;
  if (localeId === undefined) {
    localeId = i18nDefaultLocale!;
  }
  if (!i18nLocalesMap) {
    return { lang: localeId, locale: localeId };
  }
  return {
    locale:
      i18nLocalesMap.find(({ id }) => id === localeId)?.value ||
      i18nLocalesMap[0].value,
    lang: localeId,
  };
};
