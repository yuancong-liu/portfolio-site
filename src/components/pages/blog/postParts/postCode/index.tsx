'use client';
import { ComponentProps, useRef, useState } from 'react';

import classNames from 'classnames';

import Copy from '~/assets/icons/copy.svg';

import styles from './index.module.scss';

type Props = ComponentProps<'code'>;

export const PostCode = ({ className = '', ...restProps }: Props) => {
  const [copied, setCopied] = useState(false);
  const language = className.split(' ')[1]?.split('-')[1];
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    setCopied(true);
    const code = codeRef.current?.innerText;
    if (code) navigator.clipboard.writeText(code);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!language)
    return (
      <code
        {...restProps}
        className={classNames(styles['code'], styles['-inline'])}
      />
    );

  return (
    <div className={styles['code-wrapper']}>
      <div className={styles['code-header']}>
        <span className={styles['language']}>{language}</span>
        <button className={styles['copy-button']} onClick={handleCopy}>
          <Copy className={styles['icon']} />
        </button>
        <span
          className={classNames(
            styles['copy-message'],
            copied && styles['-show'],
          )}
        >
          Copied!
        </span>
      </div>
      <code
        {...restProps}
        ref={codeRef}
        className={classNames(className, styles['code'], styles['-block'])}
      />
    </div>
  );
};
