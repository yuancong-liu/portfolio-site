'use client';
import { useRef } from 'react';
import classNames from 'classnames';
import { usePostProcessing } from '~/hooks/libs/usePostProcessing';
import styles from './index.module.scss';

type Props = {
  content: string;
};

export const PostContent = ({ content }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  // const [processing, setProcessing] = useState(true);

  usePostProcessing({ content: contentRef });

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
      className={classNames(styles['content-wrapper'], {
        // [styles['processing']]: processing,
      })}
    />
  );
};
