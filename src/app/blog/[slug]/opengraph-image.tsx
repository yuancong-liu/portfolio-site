import { ImageResponse } from 'next/og';
import CMark from '~/assets/icons/c-mark-sp.svg';
import { getPostBySlug } from '~/utils/posts';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};

type Props = {
  params: { slug: string };
};

// Image generation
export default async function Image({ params }: Props) {
  // Get post data
  const { title } = getPostBySlug(params.slug, ['title']);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: '#132043',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 80,
        }}
      >
        <CMark />
        <p style={{ fontWeight: 600, color: 'white' }}>{title || 'No title'}</p>
      </div>
    ),
    {
      ...size,
    },
  );
}
