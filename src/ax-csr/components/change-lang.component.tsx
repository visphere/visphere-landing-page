/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: change-lang.component.tsx
 *   Created at: 2023-08-13, 22:26:16
 *   Last updated at: 2023-08-13, 22:30:39
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
import { type JSX } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import { BsCaretDownFill } from 'react-icons/bs';
import { environment } from '~/env/environment';
import { getUiTranslationCaptions } from '~/i18n/captions';
import { ILocale } from '~/i18n/types';
import useUnfocusClose from '../hooks/use-unfocus-close';

type Props = {
  currentPage: URL;
  currentLocale: ILocale;
};

const ChangeLang: React.FC<Props> = ({
  currentPage,
  currentLocale,
}): JSX.Element => {
  const [buttonRef, isOpen, setIsOpen] = useUnfocusClose({
    initialActive: false,
  });

  const {
    contentDistributorBaseUrl: cdnPatch,
    i18nLocalesMap,
    i18nDefaultLocale,
  } = environment;
  const { value, name } = getUiTranslationCaptions(currentLocale.locale);

  const handleToggleMenuVisibility = (): void => {
    setIsOpen(prevValue => !prevValue);
  };

  const generateLangUrl = (lang: string): string => {
    if (lang === i18nDefaultLocale) {
      return currentPage.pathname.replace(/\/(en|pl)/i, '');
    }
    return `${lang}${currentPage.pathname}`;
  };

  const listLangElements: JSX.Element[] = i18nLocalesMap.map(
    ({ id, name, value }) => (
      <li key={value}>
        <a
          href={generateLangUrl(id)}
          className={clsx(
            'msph_footer__select-list-element',
            'hover:bg-gray-600',
            value === currentLocale.locale &&
              'msph_footer__select-list-element--active'
          )}>
          <img
            src={`${cdnPatch}/static/icon/lang/${value}.png`}
            width="23"
            height="23"
            className="me-2"
            alt=""
          />
          <p>{name}</p>
        </a>
      </li>
    )
  );

  return (
    <div className="relative text-sm">
      <button
        ref={buttonRef}
        onClick={handleToggleMenuVisibility}
        className="msph_footer__select-list-button">
        <img
          src={`${cdnPatch}/static/icon/lang/${value}.png`}
          width="23"
          height="23"
          className="me-2"
          alt=""
        />
        {name}
        <BsCaretDownFill className="ms-2 text-sm" />
      </button>
      {isOpen && (
        <ul className="msph_footer__select-list-container bg-msph-primary-dark">
          {listLangElements}
        </ul>
      )}
    </div>
  );
};

export default ChangeLang;
