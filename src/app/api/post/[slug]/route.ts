import { getDownloadURL, ref } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';

import { storage } from '~/config/firebase';

export const GET = async (
  _: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;
  const storageRef = ref(storage, `posts/${slug}.mdx`);

  return NextResponse.json({
    url: await getDownloadURL(storageRef),
  });
};
