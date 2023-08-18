/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: MobileNav.tsx
 *   Created at: 2023-08-17, 23:17:24
 *   Last updated at: 2023-08-17, 23:17:24
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
import { type JSX, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { motion } from 'framer-motion';
import { List, XLg } from 'react-bootstrap-icons';
import {
  AdditionalTranslations,
  HeaderLink,
} from '~/ax-ssr/components/Header.astro';
import { environment } from '~/env/environment';
import { ILocale } from '~/i18n/types';
import { i18nHref } from '~/i18n/url-parser';
import ChangeLang from './ChangeLang';

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '100%' },
};

type Props = {
  lang: string;
  currentLocale: ILocale;
  currentPage: URL;
  headerLinks: HeaderLink[];
  additionalTranslations: AdditionalTranslations;
};

const MobileNav: React.FC<Props> = ({
  lang,
  currentLocale,
  currentPage,
  headerLinks,
  additionalTranslations,
}): JSX.Element => {
  const { clientBaseUrl, contentDistributorBaseUrl: cdnUrl } = environment;
  const logoImagePath = `${cdnUrl}/static/logo/moonsphere-orange-variant-1.svg`;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const enableScrollRef = useRef<HTMLElement>(null);

  const generatedHeaderLinks: JSX.Element[] = headerLinks.map(
    ({ link, translation }) => (
      <li key={link}>
        <a
          href={i18nHref(`/${link}`, lang)}
          className="font-semibold block py-5 text-xl hover:underline">
          {translation}
        </a>
      </li>
    )
  );

  useEffect(() => {
    if (enableScrollRef.current) {
      if (isVisible) {
        disableBodyScroll(document.documentElement);
      } else {
        enableBodyScroll(document.documentElement);
      }
    }
  }, [isVisible]);

  return (
    <>
      <motion.nav
        animate={isVisible ? 'open' : 'closed'}
        transition={{ ease: 'easeInOut' }}
        variants={variants}
        ref={enableScrollRef}
        className="msph-slide-nav__container">
        <div className="flex justify-between items-center">
          <a href={i18nHref('/', lang)} className="flex gap-2">
            <img src={logoImagePath} alt="" width={30} height={30} />
            <h1 className="font-logo text-2xl leading-[28px] font-semibold">
              MoonSphere
            </h1>
          </a>
          <div className="flex gap-x-5">
            <ChangeLang
              currentLocale={currentLocale}
              currentPage={currentPage}
              hideLabels={true}
              theme="light"
              position="bottom"
            />
            <button className="p-2" onClick={() => setIsVisible(false)}>
              <XLg width={20} height={20} />
            </button>
          </div>
        </div>
        <ul className="flex-grow mt-5">{generatedHeaderLinks}</ul>
        <div className="grid grid-cols-12 gap-3">
          <a
            href={`${clientBaseUrl}/auth/login`}
            className="msph-mobile-nav__button sm:col-span-6">
            {additionalTranslations.signIn}
          </a>
          <a
            href={`${clientBaseUrl}/auth/register`}
            className="msph-mobile-nav__button--outline sm:col-span-6">
            {additionalTranslations.signUp}
          </a>
          <a
            href={clientBaseUrl}
            className="msph-mobile-nav__button border-msph-primary-dark bg-msph-primary-dark text-msph-primary-light">
            {additionalTranslations.openApp}
          </a>
        </div>
      </motion.nav>
      <button
        className="flex items-center p-1 lg:hidden"
        onClick={() => setIsVisible(true)}>
        <List width={24} height={24} />
      </button>
    </>
  );
};

export default MobileNav;
