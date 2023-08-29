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
import { useState } from 'react';
import type { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

const variants = {
  slideDown: { opacity: 1, top: '10px' },
  slideUp: { opacity: 0, top: '-80px' },
};

const TRIGGER_Y_POS_PX = 50;

type Props = {
  children: ReactNode;
};

const SlideHeader: React.FC<Props> = ({ children }): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { scrollY } = useScroll();

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
      {children}
    </motion.header>
  );
};

export default SlideHeader;
