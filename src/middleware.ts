/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: middleware.ts
 *   Created at: 2023-08-12, 12:14:30
 *   Last updated at: 2023-08-12, 12:14:30
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
import { APIContext, MiddlewareNext } from 'astro';
import { i18nMiddleware } from 'astro-i18n-aut';
import { sequence } from 'astro/middleware';
import { loadTranslations } from './i18n/translations';

const i18n = i18nMiddleware({ defaultLocale: 'pl' });

async function i18nLoader(
  { url }: APIContext<Record<string, any>>,
  next: MiddlewareNext<Response>
): Promise<Response> {
  let pathname = url.pathname.replace(/\/(en|pl)/i, '');
  if (pathname === '' || pathname === '/') {
    pathname = `/root`;
  }
  await loadTranslations(url, `landing-page/pages${pathname}`);
  return next();
}

export const onRequest = sequence(i18nLoader, i18n);
