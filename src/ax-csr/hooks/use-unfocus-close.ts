/*
 * Copyright (c) 2023 by MILOSZ GILGA <https://miloszgilga.pl>
 * Silesian University of Technology
 *
 *   File name: use-unfocus-close.ts
 *   Created at: 2023-08-14, 00:02:42
 *   Last updated at: 2023-08-14, 00:02:42
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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type Props = {
  initialActive: boolean;
};

const useUnfocusClose = ({
  initialActive,
}: Props): [
  React.MutableRefObject<any>,
  boolean,
  Dispatch<SetStateAction<boolean>>,
] => {
  const [isActive, setIsActive] = useState<boolean>(initialActive);
  const containerRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return [containerRef, isActive, setIsActive];
};

export default useUnfocusClose;
