import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LayoutPost } from "~/components/layouts/posts";
import FourOhFourPage from "~/pages/404";
import { Post } from "~/types/Posts";
import { getAllPosts, getPostBySlug, markdownToHtml } from "~/utils/posts";
import styles from "./index.module.scss";

const Post: NextPage<{ post: Post }> = ({ post }) => {

  const router = useRouter();
  
  useEffect(() => {
    switch (post.tags[0]) {
      case "Chinese":
        document.documentElement.lang = "zh-Hant"
        return;
      case "English":
        document.documentElement.lang = "en"
        return;
      case "Japanese":
        document.documentElement.lang = "ja"
        return;
      default:
        return;
    }
  }, [post.tags]);

  if (router.isFallback && !post?.slug) {
    return <FourOhFourPage />
  }


  const getDateString = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate() - 1}`;
  };

  const getTagList = (tags: string[] | string) => {
    if (typeof tags === "string") return;
    return tags.map((tag: string) => (
      <span key={tag} className={styles['tag']}>{tag}</span>
    ));
  };

  return (
    <LayoutPost>
      <Head>
        <title>{post.title} | The Colorador Lounge</title>
      </Head>
      <main className={styles['main-wrapper']}>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <h1 className={styles['title']}><span className={styles['before']}>/*</span>{post.title}<span className={styles['after']}>*/</span></h1>
        <p className={styles['date']}>{getDateString(post.date)}</p>
        <div className={styles['tag-group']}>
          {getTagList(post.tags)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles['content-wrapper']} />
      </main>
    </LayoutPost>
  );
}

export const getStaticPaths = async ({ locales }: { locales: Array<any> } ) => {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.flatMap((post: Post) => {
      return locales.map((locale: string) => {
        return {
          params: {
            slug: post.slug,
          },
          locale: locale,
        };
      });
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