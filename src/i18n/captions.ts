/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { environment } from '~/env/environment';
import { ITranslation } from './types';

export const getUiTranslationCaptions = (locale: string): ITranslation => {
  const { i18nLocalesMap } = environment;
  if (!i18nLocalesMap) {
    throw new Error('Translations are unavailable');
  }
  return (
    i18nLocalesMap.find(
      ({ value: translationLang }: ITranslation) => translationLang === locale
    ) || i18nLocalesMap[0]
  );
};
