/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: useScrollEnabledOnResize.ts
 *   Created at: 2023-08-29, 18:21:41
 *   Last updated at: 2023-08-29, 18:21:41
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
