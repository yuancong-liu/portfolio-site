import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';

import { BlogPageContent } from '~/components/pages/blog/blogPageContent';
import { PostFrame } from '~/components/pages/blog/postParts/postFrame';
import { generateRssFeed } from '~/utils/feed';
import { getAllTags, getAllPosts } from '~/utils/posts';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'),
  robots: 'all',
  title: "YC's Blog",
};

/**
 * Blog page
 */
const BlogPage = () => {
  generateRssFeed(async (content) =>
    (await import('react-dom/server')).renderToStaticMarkup(
      (await compileMDX({ source: content, components: { PostFrame } }))
        .content as any,
    ),
  );

  const { allPosts } = getAllPosts();
  const { allTags } = getAllTags();

  const latestPostTitle = allPosts[0].title;
  metadata.description = `Welcome to YC\'s blog! Read the latest blog post: ${latestPostTitle}`;

  return <BlogPageContent allPosts={allPosts} allTags={allTags} />;
};

export default BlogPage;
