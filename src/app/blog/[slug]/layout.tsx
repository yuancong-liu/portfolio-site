import { NavBarCommon } from '~/components/common/navBarCommon';
import styles from './layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
  return (
    <div className={styles['page-wrapper']}>
      <NavBarCommon />
      {children}
    </div>
  );
}
