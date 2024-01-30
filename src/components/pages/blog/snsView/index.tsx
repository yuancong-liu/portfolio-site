'use client';
import { useState } from 'react';
import { Timeline } from 'react-twitter-widgets';

import classNames from 'classnames';
import Link from 'next/link';

import GitHub from '~/assets/icons/github.svg';
import LinkedIn from '~/assets/icons/linkedin.svg';
import Mail from '~/assets/icons/mail.svg';
import Twitter from '~/assets/icons/twitter.svg';
import { LoadingIndicator } from '~/components/common/loadingIndicator';

import styles from './index.module.scss';

type SocialMedium = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const socialMedia: SocialMedium[] = [
  {
    name: 'github',
    link: 'https://github.com/yuancong-liu',
    icon: <GitHub />,
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/yuancong-liu/',
    icon: <LinkedIn />,
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/YUANTSUNG129',
    icon: <Twitter />,
  },
  {
    name: 'mail',
    link: 'mailto:yuanc129.liu@yahoo.com',
    icon: <Mail />,
  },
];

export const SnsView = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className={styles['view-wrapper']}>
      <div
        className={classNames(styles['twitter'], loading && styles['-loading'])}
      >
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'YUANTSUNG129',
          }}
          options={{
            theme: 'dark',
            maxHeight: '100%',
          }}
          onLoad={() => setLoading(false)}
        />
        {loading && <LoadingIndicator />}
      </div>
      <aside className={styles['social-icons']}>
        <ul className={styles['icon-list']}>
          {socialMedia.map(({ name, link, icon }) => (
            <li key={name} className={styles['icon-item']}>
              <Link href={link} className={styles['link']}>
                {icon}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};
