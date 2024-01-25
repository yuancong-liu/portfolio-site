import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';

import { AdjacentPosts } from '~/components/pages/blog/adjacentPosts';
import { PostContent } from '~/components/pages/blog/postContent';
import {
  convertTagToParam,
  getAllPosts,
  getPostBySlug,
  mdxSerializeConfig,
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
  const { post } = await getPost({ slug: params.slug });
  const { title, slug, tags, content, date } = post;

  if (!title) return <></>;

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}/`;

  metadata.openGraph = {
    title,
    url,
    type: 'website',
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

  const serializedContent = await serialize(content, mdxSerializeConfig);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`}
        />
      </Head>
      <header className={styles['header']}>
        <div className={styles['tag-group']}>{getTagList(tags)}</div>
        <h1 className={styles['title']}>{title}</h1>
        <p className={styles['date']}>{getDateString(date)}</p>
      </header>
      <main className={styles['main-wrapper']}>
        <PostContent content={serializedContent} postUrl={url} />
        <div className={styles['adjacent-posts']}>
          <AdjacentPosts slug={slug} />
        </div>
      </main>
    </>
  );
};

export const generateStaticParams = () => {
  const posts = getAllPosts(['slug']);

  return posts.map((post) => {
    return { slug: post.slug };
  });
};

const getPost = async ({ slug }: { slug: string }) => {
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'content',
    'tags',
  ]);

  return {
    post: JSON.parse(JSON.stringify(post)),
  };
};

export default PostPage;
