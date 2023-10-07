/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { useEffect, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';

type Props = {
  initialPos?: number;
  elementRef: RefObject<HTMLElement>;
};

const useScrollPosition = ({
  initialPos = 0,
  elementRef,
}: Props): MutableRefObject<number> => {
  const scrollPos = useRef<number>(initialPos);

  useEffect(() => {
    const onListScollEvent = () => {
      if (elementRef.current) {
        scrollPos.current = elementRef.current?.scrollTop;
      }
    };
    elementRef.current?.addEventListener('scroll', onListScollEvent);
    return () => {
      elementRef.current?.removeEventListener('scroll', onListScollEvent);
    };
  }, [elementRef]);

  return scrollPos;
};

export default useScrollPosition;
