---
title: Note | 為這個博客的每個頁面設置動態連結
date: 2022-10-12 18:24:50
tags:
- Chinese
- Programming
- Next.js
- i18n
- Front-end
---

在這個網站的開發過程中出現以下需求：
1. 為每一篇博文動態生成連結
2. 用i18n實現多語言支援

開發過程中出現了各種各樣的問題，在這裡總結一下。

## 頁面的動態生成

在官方文檔中，文件目錄和連結是一致的，所以
```javascript
// posts/[id].js
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```
這樣的代碼可以直接生成動態連結。

但是在這個網站中，和教程一樣，我把markdown文檔保存在`src/posts`中，但我的博客目錄是`the-colorador-lounge/`，所以不能和教程一樣，獲取整個路徑直接加在href裡，而需要先取得post的slug，並重新裝進其他字符串裡。

```typescript
const realSlug = slug.replace(/\.md$/, '');
const fullPath = path.join(postsDirectory, `${realSlug}.md`);
```

```typescript
// the-colorador-lounge/[slug].tsx
allPosts.map((post: Post) => (
  <Link key={post.slug} href={"the-colorado-lounge/" + post.slug} locale={getLocale(post.tags[0])}>
    <h2>{post.title}</h2>
    <p>{getDateString(post.date)}</p>
  </Link>
));
```

## 博客明明只有一種語言卻要強制生成其他語言的連結？

在前面的開發中，我用i18n實現了多語言支援，i18n-next不同於i18n-react，當前語言會體現在當前頁面的url中。例如，在以下配置的情況下：

```javascript
// next-i18next.config.js
defaultLocale: 'en',
locales: ['en', 'ja', 'kr', 'zh-Hans', 'zh-Hant'],
```
按照這樣的配置，除了默認語言不會體現在url中之外，其他語言都會以`/zh-Hant/the-colorador-lounge`的方式體現在url中。

照上述的動態連結生成方法，本文連結將自動被生成為`/the-colorador-lounge/dynamic-post-path`，也就是說，本頁面的默認語言是`'en'`。

這樣處理的結果是，next.js並不會為其他語言自動生成連結。也就是說，從`/zh-Hant/the-colorador-lounge`點擊某篇博文，將直接跳轉至404頁面。

### 文章本身不多語言支援，但要為所有語言生成連結？

參考官方文檔後發現，下面這樣的代碼只能為默認語言生成連結：

```typescript
paths: posts.flatMap((post: Post) => {
  return {
    params: { slug: post.slug }
  };
})
```

解決方法是加上`locale`參數。但為了確保從每一個語言的博客首頁進入博文都能顯示正確的頁面，我首先嘗試了不僅map所有的slug，還map所有的語言，代碼變成了這樣：

```typescript
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
```

這樣next.js將會為每一篇博文每一種語言都生成連結，但是問題在於，要為五種語言生成頁面，負荷突然變成了五倍。而且以下連結都是一模一樣的內容：

```
/the-colorado-lounge/dynamic-post-path
/zh-Hant/the-colorado-lounge/dynamic-post-path
/zh-Hans/the-colorado-lounge/dynamic-post-path
/kr/the-colorado-lounge/dynamic-post-path
/ja/the-colorado-lounge/dynamic-post-path
```

並且更大的問題是，i18n在瀏覽器識別當前頁面語言的時候也能起作用，也就是說，上面的五個頁面，儘管內容一模一樣，但是會被瀏覽器識別為不同語言的頁面。

### 只為當前博文的語言生成連結，並統一所有語言的博客主頁的博文連結

決定這樣做之後的第一個問題是，從哪裡判定這篇博文是什麼語言？

好在markdown寫博客都有tags，雖然很隨便，但是我決定用tags的第一個元素來判定當前博文的語言。

```typescript
// get the language of posts
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

// generate link for posts
paths: posts.flatMap((post: Post) => {
  return {
    params: {
      slug: post.slug,
    },
    locale: getLocale(post.tags[0]),
  };
})
```

在博客主頁中，用同樣的方法指定博文的連結：
```typescript
allPosts.map((post: Post) => (
  <Link key={post.slug} href={"the-colorado-lounge/" + post.slug} locale={getLocale(post.tags[0])}>
    <a>
      <h2>{post.title}</h2>
      <p>{getDateString(post.date)}</p>
    </a>
  </Link>
))
```

這樣就可以只為博文的語言生成連結，並在所有語言版本的博客主頁將這一個連結指派給博文。

---

### 參考
* Next.js官方教程：[Dynamic Path](https://nextjs.org/learn/basics/dynamic-routes)
* Next.js官方文檔：[Internationalized Routing](https://nextjs.org/docs/advanced-features/i18n-routing)