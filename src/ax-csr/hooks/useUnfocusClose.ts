/*
 * Copyright (c) 2023 by MoonSphere Systems
 * Originally developed by Milosz Gilga <https://miloszgilga.pl>
 */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type Props = {
  initialActive: boolean;
};

const useUnfocusClose = <T extends HTMLElement>({
  initialActive,
}: Props): [React.RefObject<T>, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialActive);
  const containerRef = useRef<T>(null);

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
