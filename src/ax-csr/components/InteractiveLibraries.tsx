/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: InteractiveLibraries.tsx
 *   Created at: 2023-08-20, 23:58:11
 *   Last updated at: 2023-08-21, 00:00:44
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
import { useRef } from 'react';
import type { JSX, ReactNode } from 'react';
import useRollingContent from '../hooks/useRollingContent';
import InteractiveButton from './InteractiveButton';
import InteractiveSeparator from './InteractiveSeparator';

type Props = {
  headerContent: string;
  children: ReactNode;
};

const InteractiveLibraries: React.FC<Props> = ({
  headerContent,
  children,
}): JSX.Element => {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [setIsScrolling] = useRollingContent({
    containerRef: listContainerRef,
    scrollRef: listRef,
  });

  const handleMoveToTop = () => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div className="relative w-full h-full font-mono text-gray-600">
      <div className="msph-interactive-libraries__top-gradient" />
      <div className="msph-interactive-libraries__header">
        <p className="mt-3 text-2xl text-gray-300">
          {headerContent}
          <span className="animate-ping">_</span>
        </p>
      </div>
      <div className="msph-interactive-libraries__scroll-track"></div>
      <div
        className="msph-interactive-libraries__scroll scrollbar scrollbar-rounded scrollbar-thumb:bg-white"
        ref={listContainerRef}
        onMouseEnter={() => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(true)}>
        <div className="absolute top-0 left-0 w-full">
          <InteractiveSeparator symmetricLength={11} mirror />
          <ul ref={listRef} className="msph-interactive-libraries__list">
            {children}
          </ul>
          <InteractiveSeparator symmetricLength={11} />
          <div className="mt-20 mb-28 flex justify-center">
            <InteractiveButton clickCallback={handleMoveToTop}>
              {'/\\'}
            </InteractiveButton>
          </div>
        </div>
      </div>
      <div className=" msph-interactive-libraries__bottom-gradient" />
    </div>
  );
};

export default InteractiveLibraries;
