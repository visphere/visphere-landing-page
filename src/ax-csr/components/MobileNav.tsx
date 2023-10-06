/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { useRef, useState } from 'react';
import type { JSX, ReactNode } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { List, XLg } from 'react-bootstrap-icons';
import { environment } from '~/env/environment';
import { i18nHref } from '~/i18n/url-parser';
import useScrollEnabledOnResize from '../hooks/useScrollEnabledOnResize';

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '100%' },
};

type Props = {
  lang: string;
  foreground?: string;
  children: ReactNode;
};

const MobileNav: React.FC<Props> = ({
  lang,
  foreground = 'text-msph-dark-900',
  children,
}): JSX.Element => {
  const { contentDistributorBaseUrl: cdnUrl } = environment;
  const logoImagePath = `${cdnUrl}/static/logo/moonsphere.svg`;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const enableScrollRef = useRef<HTMLElement>(null);

  useScrollEnabledOnResize({ elementRef: enableScrollRef, isVisible });

  return (
    <>
      <motion.nav
        animate={isVisible ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut' }}
        variants={variants}
        ref={enableScrollRef}
        className="msph-slide-nav__container top-0 z-50">
        <div className="flex justify-between items-center">
          <a href={i18nHref('/', lang)} className="flex gap-2">
            <img src={logoImagePath} alt="" width={35} height={35} />
            <h1 className="text-2xl font-semibold leading-[28px]">
              MoonSphere
            </h1>
          </a>
          <button className="p-2" onClick={() => setIsVisible(false)}>
            <XLg width={20} height={20} />
          </button>
        </div>
        {children}
      </motion.nav>
      <button
        className={clsx(`flex items-center p-1 lg:hidden`, foreground)}
        onClick={() => setIsVisible(true)}>
        <List width={24} height={24} />
      </button>
    </>
  );
};

export default MobileNav;
