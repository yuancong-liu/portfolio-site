import type { NextPage } from 'next';
import Link from 'next/link';

/**
 * 404 page
 * 404画面
 *
 */
const FourOhFourPage: NextPage = () => {
  return (
    <main>
      <p>Room not found!</p>
      <Link href="/">Go back to lobby</Link>
    </main>
  );
};

export default FourOhFourPage;
