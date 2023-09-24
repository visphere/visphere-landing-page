/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import * as React from 'react';
import { useRef } from 'react';
import type { JSX, ReactNode } from 'react';
import useRollingContent from '../../hooks/useRollingContent';
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
    <div className="relative w-full h-full font-mono text-msph-gray-600">
      <div className="msph-interactive-libraries__top-gradient" />
      <div className="msph-interactive-libraries__header">
        <p className="mt-3 text-2xl text-msph-gray-300">
          {headerContent}
          <span className="animate-ping">_</span>
        </p>
      </div>
      <div className="msph-interactive-libraries__scroll-track"></div>
      <div
        className="msph-interactive-libraries__scroll scrollbar scrollbar-rounded scrollbar-thumb:bg-msph-light-100"
        ref={listContainerRef}
        onMouseEnter={() => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(true)}>
        <div className="absolute top-0 left-0 w-full">
          <InteractiveSeparator symmetricLength={5} mirror />
          <ul ref={listRef} className="msph-interactive-libraries__list">
            {children}
          </ul>
          <InteractiveSeparator symmetricLength={5} />
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
