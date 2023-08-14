/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: environment.ts
 *   Created at: 2023-08-11, 23:48:52
 *   Last updated at: 2023-08-11, 23:48:55
 *
 *   Project name: moonsphere
 *   Module name: moonsphere-landing-page
 *
 * This project is a part of "MoonSphere" instant messenger system. This system is a part of
 * completing an engineers degree in computer science at Silesian University of Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *   <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
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
