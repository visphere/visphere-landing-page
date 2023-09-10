/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
 */
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import useScrollPosition from './useScrollPosition';

type Props = {
  containerRef: RefObject<HTMLElement>;
  scrollRef: RefObject<HTMLElement>;
  speed?: number;
};

const useRollingContent = ({ containerRef, scrollRef, speed = 12 }: Props) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(true);
  const intervalId = useRef<NodeJS.Timer>();

  const positionRef = useScrollPosition({
    elementRef: containerRef,
  });

  useEffect(() => {
    if (containerRef.current && scrollRef.current) {
      intervalId.current = setInterval(() => {
        if (isScrolling) {
          containerRef.current?.scrollTo(0, positionRef.current++);
        }
        if (positionRef.current === scrollRef.current?.clientHeight) {
          clearInterval(intervalId.current);
        }
      }, speed);
    }
    return () => clearInterval(intervalId.current);
  }, [isScrolling]);

  return [setIsScrolling];
};

export default useRollingContent;
