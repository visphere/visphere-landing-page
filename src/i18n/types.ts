/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';

export interface ITranslation {
  name: string;
  id: string;
  value: string;
}

export interface ILocale {
  lang: string;
  locale: string;
}

const flattedLocales = environment.i18nLocalesMap.map(({ id }) => id);
export type Lang = keyof typeof flattedLocales;
