import { ComponentProps, useRef } from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

type Props = ComponentProps<'code'>;

export const PostCode = ({ className = '', ...restProps }: Props) => {
  const language = className.split(' ')[1]?.split('-')[1];
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    const code = codeRef.current?.innerText;
    if (code) navigator.clipboard.writeText(code);
  };

  if (!language)
    return (
      <code
        {...restProps}
        className={classNames(styles['code'], styles['-inline'])}
      />
    );

  return (
    <>
      <div className={styles['code-header']}>
        <span className={styles['language']}>{language}</span>
        <button className={styles['copy-button']} onClick={handleCopy}>
          Copy
        </button>
      </div>
      <code
        {...restProps}
        ref={codeRef}
        className={classNames(className, styles['code'], styles['-block'])}
      />
    </>
  );
};
