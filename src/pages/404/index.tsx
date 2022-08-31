import type { NextPage } from 'next'
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
      <Link href='/'><a>Go back to lobby</a></Link>
    </main>
  )
}

export default FourOhFourPage;
