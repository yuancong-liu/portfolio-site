import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './index.module.scss';

export const ProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className={styles['progress-bar']} style={{ x }} />
    </>
  );
};
