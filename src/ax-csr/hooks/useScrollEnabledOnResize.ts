/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

type Props = {
  elementRef: RefObject<HTMLElement>;
  viewPortTrigger?: number;
  isVisible: boolean;
};

const useScrollEnabledOnResize = ({
  elementRef,
  isVisible,
  viewPortTrigger = 1024,
}: Props) => {
  const triggerBodyScroll = (isEnabled: boolean) => {
    if (isEnabled) {
      enableBodyScroll(document.documentElement);
    } else if (isVisible) {
      disableBodyScroll(document.documentElement);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      triggerBodyScroll(window.innerWidth > viewPortTrigger);
    };
    if (elementRef.current) {
      triggerBodyScroll(!isVisible);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);
};

export default useScrollEnabledOnResize;
