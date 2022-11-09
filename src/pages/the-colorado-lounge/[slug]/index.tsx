import classNames from "classnames";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ProgressBar } from "~/components/common/bars/progressBar";
import { LayoutPost } from "~/components/layouts/posts";
import FourOhFourPage from "~/pages/404";
import { Post } from "~/types/Posts";
import { getAllPosts, getPostBySlug, markdownToHtml } from "~/utils/posts";
import styles from "./index.module.scss";

const Post: NextPage<{ post: Post, locale: string }> = ({ post, locale }) => {

  const router = useRouter();

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
        <title>{post.title}</title>
      </Head>
      <main className={styles['main-wrapper']}>
        <ProgressBar />
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <h1 className={styles['title']}><span className={styles['before']}>/*</span>{post.title}<span className={styles['after']}>*/</span></h1>
        <p className={styles['date']}>{getDateString(post.date)}</p>
        <div className={styles['tag-group']}>
          {getTagList(post.tags)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className={classNames(styles['content-wrapper'], locale)} />
      </main>
    </LayoutPost>
  );
}

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug', 'tags']);

  const getLocale = (languageTag: string) => {
    switch (languageTag) {
      case "Chinese":
        return "zh-Hant";
      case "English":
        return "en";
      case "Japanese":
        return "ja";
      default:
        return "en";
    }
  }

  return {
    paths: posts.flatMap((post: Post) => {
        return {
          params: {
            slug: post.slug,
          },
          locale: getLocale(post.tags[0]),
        };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params, locale }: { params: { slug: string }, locale: string }) => {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content", "tags"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: JSON.parse(JSON.stringify({
        ...post,
        content,
      })),
      locale: locale
    },
  };
};

export default Post;