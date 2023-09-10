/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import axios from 'axios';
import flatPackage from 'flat';
import * as rambda from 'ramda';
import { environment } from '~/env/environment';
import { getSafetyLocaleSSR } from './utils';

const translations = {};
const defModules = ['web-common', 'landing-page'];

export const loadTranslationsSSR = async (
  url: URL,
  i18nPageModule: string
): Promise<void> => {
  const { locale } = getSafetyLocaleSSR(url);
  const { contentDistributorBaseXHR: cdnXHR } = environment;
  const result = await Promise.all(
    [...defModules, i18nPageModule].map(async module => {
      try {
        const { data } = await axios.get(
          `${cdnXHR}/static/i18n/${module}/${locale}.json`
        );
        return data;
      } catch (err) {
        return {};
      }
    })
  );
  const flatted = result.reduce(
    (acc, translation) => ({ ...acc, ...translation }),
    {}
  );
  Object.assign(translations, flatPackage.unflatten(flatted));
};

export const useTranslationsSSR = (
  prefix?: string
): ((key: string) => string) => {
  return (key: string) => {
    const fullKey = `${prefix}.${key}`;
    return rambda.pathOr(fullKey, rambda.split('.', fullKey), translations);
  };
};
