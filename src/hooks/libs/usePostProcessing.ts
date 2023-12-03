import { RefObject, useLayoutEffect } from 'react';

type Props = {
  content?: RefObject<HTMLDivElement>;
};

export const usePostProcessing = ({ content }: Props) => {
  useLayoutEffect(() => {
    if (!content?.current) return;

    // add language attr to code blocks
    // content.current.querySelectorAll('code').forEach((codeBlock) => {
    //   const language = codeBlock.className.split('-')[1];
    //   codeBlock.setAttribute('data-language', language);
    // });

  }, [content]);
};
