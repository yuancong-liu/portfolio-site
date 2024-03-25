import { Metadata } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Article, WithContext } from 'schema-dts';

import { AdjacentPosts } from '~/components/pages/blog/adjacentPosts';
import { PostContent } from '~/components/pages/blog/postContent';
import { getDateString } from '~/utils/dates';
import {
  convertTagToParam,
  getPostsByFields,
  getPostBySlug,
} from '~/utils/posts';

import styles from './index.module.scss';

export const metadata: Metadata = {
  robots: 'all',
};

type Props = {
  params: { slug: string };
};

export const generateStaticParams = () => {
  const posts = getPostsByFields(['slug']);

  return posts.map((post) => ({ slug: post.slug }));
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

const PostPage = async ({ params }: Props) => {
  const { post } = await getPost({ slug: params.slug });
  const { title, slug, tags, content, date } = post;

  if (!title) return null;

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

  metadata.alternates = {
    canonical: `/blog/${slug}`,
  };

  metadata.openGraph = {
    title,
    url,
    type: 'website',
    description: title,
  };

  const getTagList = (tagParams: string[] | string) => {
    if (!tagParams) return null;
    if (typeof tagParams === 'string') return [tagParams];
    return tagParams.map((tag: string) => (
      <Link
        key={tag}
        href={`/blog/tags/${convertTagToParam(tag)}`}
        className={styles.tag}
      >
        {tag}
      </Link>
    ));
  };

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: title,
    headline: title,
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: 'Paul LIU',
    },
    publisher: {
      '@type': 'Person',
      name: 'Paul LIU',
    },
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`}
        />
        <script
          key="json-ld"
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <h1 className={styles.title}>{title}</h1>
      <header className={styles.header}>
        <div className={styles['tag-group']}>{getTagList(tags)}</div>
        <span className={styles.date}>{getDateString(date)}</span>
      </header>
      <main className={styles['main-wrapper']}>
        <PostContent content={content} />
        <div className={styles['social-links']} />
        <div className={styles['adjacent-posts']}>
          <AdjacentPosts slug={slug} />
        </div>
      </main>
    </>
  );
};

export default PostPage;
