/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ITranslation } from '~/i18n/types';

export const environment = {
  production: process.env.__IS_PRODUCTION_MODE__,
  i18nDefaultLocale: process.env.__I18N_DEFAULT_LOCALE__,
  i18nLocalesMap: process.env.__I18N_LOCALES_MAP__ as unknown as ITranslation[],
  baseLandingUrl: process.env.__LANDING_PAGE_BASE_URL__,
  clientBaseUrl: process.env.__CLIENT_BASE_URL__,
  contentDistributorBaseUrl: process.env.__CDN_BASE_URL__,
  contentDistributorBaseXHR: process.env.__CDN_BASE_XHR__,
};
