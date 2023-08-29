/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: ChangeLang.tsx
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
import * as React from 'react';
import type { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CaretDownFill } from 'react-bootstrap-icons';
import { environment } from '~/env/environment';
import { getUiTranslationCaptions } from '~/i18n/captions';
import { ILocale } from '~/i18n/types';
import useUnfocusClose from '../hooks/useUnfocusClose';

type Props = {
  currentLocale: ILocale;
  position?: 'top' | 'bottom';
  hideLabels?: boolean;
  theme?: 'light' | 'dark';
  children: ReactNode;
};

const ChangeLang: React.FC<Props> = ({
  currentLocale,
  position = 'top',
  hideLabels,
  theme = 'dark',
  children,
}): JSX.Element => {
  const [buttonRef, isOpen, setIsOpen] = useUnfocusClose<HTMLButtonElement>({
    initialActive: false,
  });

  const { contentDistributorBaseUrl: cdnPatch } = environment;
  const { value, name } = getUiTranslationCaptions(currentLocale.locale);

  const handleToggleMenuVisibility = (): void => {
    setIsOpen(prevValue => !prevValue);
  };

  const variants = {
    open: { opacity: 1, y: 0, display: 'flex' },
    closed: {
      opacity: 0,
      y: `${position === 'bottom' ? '-' : ''}15%`,
      display: 'none',
    },
  };

  return (
    <div className="relative text-sm">
      <button
        ref={buttonRef}
        onClick={handleToggleMenuVisibility}
        className="msph_footer__select-list-button h-full">
        <img
          src={`${cdnPatch}/static/icon/lang/${value}.png`}
          width="23"
          height="23"
          className={clsx(!hideLabels && 'me-2')}
          alt=""
        />
        {!hideLabels && name}
        <CaretDownFill width={14} height={14} className="ms-2 text-sm" />
      </button>
      <motion.ul
        animate={isOpen ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut' }}
        variants={variants}
        className={clsx(
          'msph_footer__select-list-container z-0 opacity-0',
          position === 'bottom'
            ? 'translate-y-[15%] right-0 top-full mt-1 mb-0'
            : '-translate-y-[15%] left-0 bottom-full',
          theme === 'dark' ? 'bg-msph-primary-dark' : 'bg-msph-primary-light'
        )}>
        {children}
      </motion.ul>
    </div>
  );
};

export default ChangeLang;
