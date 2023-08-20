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
import { type JSX, useEffect, useState } from 'react';
import axios from 'axios';
import { environment } from '~/env/environment';

type LibraryData = {
  name: string;
  repoUrl: string;
};

const InteractiveLibraries: React.FC = (): JSX.Element => {
  const [libraries, setLibraries] = useState<LibraryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadLibrariesData = async () => {
      const { data } = await axios.get(
        `${environment.contentDistributorBaseUrl}/static/misc/libraries.json`
      );
      setLibraries(data);
      setIsLoading(false);
    };
    loadLibrariesData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center font-mono">
        loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* TODO: search bar, scroll from 90px */}
      <div className="absolute top-[15px] rounded-lg right-0 w-[3px] h-[calc(100%-30px)] bg-gray-900 z-20" />
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black from-0% to-100% z-10" />
      <ul className="absolute top-[90px] left-0 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 px-2">
        {libraries.map(({ name, repoUrl }) => (
          <li
            className="flex sm:odd:justify-end sm:even:justify-start"
            key={name}>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="truncate text-gray-600 hover:text-white text-xl font-mono">
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black from-0% to-100% z-10" />
    </div>
  );
};

export default InteractiveLibraries;
