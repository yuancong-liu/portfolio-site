import classNames from 'classnames';
import Head from 'next/head';
import { LayoutPost } from '~/components/layouts/posts';
import FourOhFourPage from '~/components/pages/404';
import { Post } from '~/types/Posts';
import { getAllPosts, getPostBySlug, markdownToHtml } from '~/utils/posts';
import styles from './index.module.scss';
import sanitize from 'sanitize-html';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ㅇㅇㅊ',
  description: 'ㅇㅇㅊ',
};

type Props = {
  params: { slug: string };
};

const PostPage = async ({ params }: Props) => {
  if (!params.slug) return <FourOhFourPage />;

  const { post } = await getPost({ slug: params.slug });

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
      <span key={tag} className={styles['tag']}>
        {tag}
      </span>
    ));
  };

  const sanitizedHtml = sanitize(post.content);

  metadata.title = post.title;

  if (!post.title) return <></>;

  return (
    <LayoutPost>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles['main-wrapper']}>
        <h1 className={styles['title']}>
          {/* <span className={styles['before']}></span> */}
          {post.title}
          {/* <span className={styles['after']}></span> */}
        </h1>
        <p className={styles['date']}>{getDateString(post.date)}</p>
        <div className={styles['tag-group']}>{getTagList(post.tags)}</div>
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          className={classNames(styles['content-wrapper'])}
        />
      </main>
    </LayoutPost>
  );
};

export const generateStaticParams = () => {
  const posts = getAllPosts(['slug']);

  const params = posts.map((post) => {
    return { slug: post.slug };
  });

  return params;
};

export const getPost = async ({ slug }: { slug: string }) => {
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
