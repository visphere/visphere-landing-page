/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: useRollingContent.ts
 *   Created at: 2023-08-28, 01:39:57
 *   Last updated at: 2023-08-28, 01:39:57
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
