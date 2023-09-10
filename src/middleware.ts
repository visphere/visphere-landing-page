/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { APIContext, MiddlewareNext } from 'astro';
import { i18nMiddleware } from 'astro-i18n-aut';
import { sequence } from 'astro/middleware';
import { loadTranslationsSSR } from './i18n/translations';

const i18n = i18nMiddleware({ defaultLocale: 'pl' });

async function i18nLoader(
  { url }: APIContext<Record<string, any>>,
  next: MiddlewareNext<Response>
): Promise<Response> {
  let pathname = url.pathname.replace(/\/(en|pl)/i, '');
  if (pathname === '' || pathname === '/') {
    pathname = `/root`;
  }
  await loadTranslationsSSR(url, `landing-page/pages${pathname}`);
  return next();
}

export const onRequest = sequence(i18nLoader, i18n);
