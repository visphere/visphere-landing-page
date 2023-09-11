/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
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
        className="msph-footer__select-list-button h-full">
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
          'msph-footer__select-list-container z-0 opacity-0',
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
