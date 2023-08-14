/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: utils.ts
 *   Created at: 2023-08-12, 12:21:59
 *   Last updated at: 2023-08-12, 12:21:59
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
