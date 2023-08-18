/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: SlideHeader.tsx
 *   Created at: 2023-08-17, 22:25:43
 *   Last updated at: 2023-08-17, 22:25:43
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
import { type JSX, useState } from 'react';
import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import {
  AdditionalTranslations,
  HeaderLink,
} from '~/ax-ssr/components/Header.astro';
import { environment } from '~/env/environment';
import { ILocale } from '~/i18n/types';
import { i18nHref } from '~/i18n/url-parser';
import ChangeLang from './ChangeLang';
import MobileNav from './MobileNav';

const variants = {
  slideDown: { opacity: 1, top: '10px' },
  slideUp: { opacity: 0, top: '-80px' },
};

const TRIGGER_Y_POS_PX = 50;

type Props = {
  currentLocale: ILocale;
  currentPage: URL;
  headerLinks: HeaderLink[];
  additionalTranslations: AdditionalTranslations;
};

const SlideHeader: React.FC<Props> = ({
  currentLocale,
  currentPage,
  headerLinks,
  additionalTranslations,
}): JSX.Element => {
  const { lang } = currentLocale;
  const { clientBaseUrl, contentDistributorBaseUrl: cdnUrl } = environment;
  const logoImagePath = `${cdnUrl}/static/logo/moonsphere-orange-variant-1.svg`;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { scrollY } = useScroll();

  const generatedFullSizeHeaderLinks: JSX.Element[] = headerLinks.map(
    ({ link, translation }) => (
      <li key={link}>
        <a
          href={i18nHref(`/${link}`, lang)}
          className="hover:underline font-semibold block">
          {translation}
        </a>
      </li>
    )
  );

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsVisible(latest > TRIGGER_Y_POS_PX);
  });

  return (
    <motion.header
      animate={isVisible ? 'slideDown' : 'slideUp'}
      transition={{ ease: 'easeInOut' }}
      variants={variants}
      className={clsx(
        'fixed w-full top-[80px] px-3 z-50',
        scrollY.getVelocity() <= TRIGGER_Y_POS_PX && 'opacity-0 -top-y-[25px]'
      )}>
      <div className="msph_ratio-container bg-white shadow-md px-6 py-4 rounded-[25px]">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-10 items-center">
            <a href={i18nHref('/', lang)} className="flex gap-2">
              <img src={logoImagePath} alt="" width={30} height={30} />
              <h1 className="font-logo text-2xl leading-[28px] font-semibold">
                MoonSphere
              </h1>
            </a>
            <ul className="flex gap-4 hidden md:flex">
              {generatedFullSizeHeaderLinks}
            </ul>
          </div>
          <div className="flex gap-3 items-center">
            <div className="hidden lg:flex gap-4">
              <div className="flex gap-x-2">
                <a
                  href={`${clientBaseUrl}/auth/login`}
                  className="hidden xl:block msph-slide-nav__button">
                  {additionalTranslations.signIn}
                </a>
                <a
                  href={`${clientBaseUrl}/auth/register`}
                  className="msph-slide-nav__button--outline">
                  {additionalTranslations.signUp}
                </a>
              </div>
              <div className="flex gap-x-2">
                <a
                  href={clientBaseUrl}
                  className="msph-slide-nav__button border-msph-primary-dark bg-msph-primary-dark">
                  {additionalTranslations.openApp}
                </a>
                <ChangeLang
                  currentLocale={currentLocale}
                  currentPage={currentPage}
                  hideLabels={true}
                  theme="light"
                  position="bottom"
                />
              </div>
            </div>
            <MobileNav
              lang={lang}
              headerLinks={headerLinks}
              currentPage={currentPage}
              currentLocale={currentLocale}
              additionalTranslations={additionalTranslations}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default SlideHeader;
