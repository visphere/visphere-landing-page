/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: MobileNav.tsx
 *   Created at: 2023-08-20, 16:36:03
 *   Last updated at: 2023-08-21, 00:02:48
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
  foreground = 'text-msph-primary-dark',
  children,
}): JSX.Element => {
  const { contentDistributorBaseUrl: cdnUrl } = environment;
  const logoImagePath = `${cdnUrl}/static/logo/moonsphere-orange-variant-1.svg`;

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
            <img src={logoImagePath} alt="" width={30} height={30} />
            <h1 className="font-logo text-2xl leading-[28px] font-medium">
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
