import { NextPage } from "next";
import { useRouter } from "next/router";
import { LayoutPost } from "~/components/layouts/posts";
import FourOhFourPage from "~/pages/404";
import { Post } from "~/types/Posts";
import { getAllPosts, getPostBySlug, markdownToHtml } from "~/utils/posts";
import styles from "./index.module.scss";

const Post: NextPage<{ post: Post }> = ({ post }) => {

  const router = useRouter();
  
  if (router.isFallback && !post?.slug) {
    return <FourOhFourPage />
  }

  return (
    <LayoutPost>
      <main className={styles['main-wrapper']}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles['content-wrapper']} />
      </main>
    </LayoutPost>
  );
}

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map((post: Post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content", "tags"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: JSON.parse(JSON.stringify({
        ...post,
        content,
      })),
    },
  };
};

export default Post;