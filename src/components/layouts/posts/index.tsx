import { motion } from "framer-motion";

export type Props = {
  children?: React.ReactNode;
}

export const LayoutPost: React.FC<Props> = ({ children }) => {

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}