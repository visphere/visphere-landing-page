/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
 */
import * as React from 'react';
import { type ReactNode } from 'react';

type Props = {
  steps?: number;
  multipler?: number;
  clickCallback: () => void;
  children: ReactNode;
};

const InteractiveButton: React.FC<Props> = ({
  steps = 3,
  multipler = 5,
  clickCallback,
  children,
}): JSX.Element => {
  const multiplierSteps = Array.from({ length: steps }, (_, i: number) => ({
    top: (i + 1) * multipler,
    offset: (i + 1) * multipler * 2,
  }));

  const generatesNotchs: JSX.Element[] = multiplierSteps.map(
    ({ top, offset }) => (
      <span
        key={top}
        style={{
          top: `${top}px`,
          width: `calc(100% + ${offset}px)`,
          height: `calc(100% - ${offset}px)`,
        }}
        className="msph-interactive-libraries__button"></span>
    )
  );

  return (
    <button
      onClick={clickCallback}
      className="relative h-[50px] px-5 text-2xl bg-gray-600 text-white bg-gradient-to-t hover:-translate-y-1">
      <span className="relative z-10">{children}</span>
      {generatesNotchs}
    </button>
  );
};

export default InteractiveButton;
