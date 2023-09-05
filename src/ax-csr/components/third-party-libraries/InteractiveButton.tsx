/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: InteractiveButton.tsx
 *   Created at: 2023-08-28, 01:07:17
 *   Last updated at: 2023-08-28, 01:07:17
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
