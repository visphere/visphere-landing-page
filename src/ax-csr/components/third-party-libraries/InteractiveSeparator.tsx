/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import * as React from 'react';

type Props = {
  symmetricLength: number;
  mirror?: boolean;
};

const InteractiveSeparator: React.FC<Props> = ({
  symmetricLength,
  mirror,
}): JSX.Element => {
  const leftElements = Array.from({ length: symmetricLength }, () =>
    mirror ? '\\' : '/'
  );
  const rightElements = Array.from({ length: symmetricLength }, () =>
    mirror ? '/' : '\\'
  );

  return (
    <span className="text-4xl flex justify-center gap-x-5 mt-24 mb-10">
      <p>{leftElements}</p>
      <p>{rightElements}</p>
    </span>
  );
};

export default InteractiveSeparator;
