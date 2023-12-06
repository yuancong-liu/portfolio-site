import { useEffect } from "react";

type Props = {
  callback: () => void;
};

export const useOnHashChange = ({ callback }: Props) => {
  useEffect(() => {
    window.addEventListener('hashchange', callback);

    return () => {
      window.removeEventListener('hashchange', callback);
    };
  }, [callback]);
};