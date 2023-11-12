import Link from 'next/link';
import styles from './index.module.scss';

type Props = {
  position: 'top' | 'bottom';
};

const links = {
  top: [
    { text: 'the Gold Room', link: '/the-gold-room' },
    { text: 'the Colorado Lounge', link: '/the-colorado-lounge' },
  ],
  bottom: [
    { text: 'Room 237', link: '/room-237' },
    { text: 'the Gallery', link: '/the-gallery' },
  ],
};

export const TopLinks: React.FC<Props> = ({ position }) => {
  const linkDisplay = () => {
    return links[position].map(
      (link: { text: string; link: string }, index: number) => {
        return (
          <p key={index} className={styles['link']}>
            <Link href={link.link}>{link.text}</Link>
          </p>
        );
      }
    );
  };

  return <div className={styles['link-group']}>{linkDisplay()}</div>;
};
