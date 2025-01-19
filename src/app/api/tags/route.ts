import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

import { db } from '~/config/firebase';

export const GET = async () => {
  const tags = await getDocs(collection(db, 'tags')).then((snapshot) =>
    snapshot.docs.map((doc) => doc.data()),
  );

  return NextResponse.json({
    tags,
  });
};
