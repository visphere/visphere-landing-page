/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
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
