import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import sanitize from 'sanitize-html';

import FourOhFourPage from '~/components/pages/404';
import { AdjacentPosts } from '~/components/pages/blog/adjacentPosts';
import { PostContent } from '~/components/pages/blog/postContent';
import {
  convertTagToParam,
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
  sanitizeConfig,
} from '~/utils/posts';

import styles from './index.module.scss';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'),
  robots: 'all',
};

type Props = {
  params: { slug: string };
};

const PostPage = async ({ params }: Props) => {
  if (!params.slug) return <FourOhFourPage />;

  const { post } = await getPost({ slug: params.slug });

  if (!post.title) return <></>;
  metadata.title = post.title;

  metadata.openGraph = {
    title: post.title,
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
  };

  const getDateString = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${
      dateObj.getDate() - 1
    }`;
  };

  const getTagList = (tags: string[] | string) => {
    if (!tags) return null;
    if (typeof tags === 'string') return;
    return tags.map((tag: string) => (
      <Link
        key={tag}
        href={`/blog/tags/${convertTagToParam(tag)}`}
        className={styles['tag']}
      >
        {tag}
      </Link>
    ));
  };

  const sanitizedHtml = sanitize(post.content, sanitizeConfig);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
        />
      </Head>
      <header className={styles['header']}>
        <div className={styles['tag-group']}>{getTagList(post.tags)}</div>
        <h1 className={styles['title']}>{post.title}</h1>
        <p className={styles['date']}>{getDateString(post.date)}</p>
      </header>
      <main className={styles['main-wrapper']}>
        <PostContent content={sanitizedHtml} />
        <div className={styles['adjacent-posts']}>
          <AdjacentPosts slug={post.slug} />
        </div>
      </main>
    </>
  );
};

export const generateStaticParams = () => {
  const posts = getAllPosts(['slug']);

  const params = posts.map((post) => {
    return { slug: post.slug };
  });

  return params;
};

const getPost = async ({ slug }: { slug: string }) => {
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'tags',
  ]);

  const content = await markdownToHtml(post.content || '');

  return {
    post: JSON.parse(
      JSON.stringify({
        ...post,
        content,
      }),
    ),
  };
};

export default PostPage;
