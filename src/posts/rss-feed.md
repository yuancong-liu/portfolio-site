---
title: Note | 為這個博客添加RSS Feed
date: 2022-10-26 18:23:14
language: 中文
tags:
- Programming
- Front-end
- Next.js
---

為這個博客實現了動態路徑生成之後，今天又為這個博客實現了RSS Feed的生成。具體效果可以參見我的GitHub主頁的博客一欄（最新博文通過GitHub workflow自動/手動取得）。

## 安裝依賴

用下面command安裝[feed](https://www.npmjs.com/package/feed)庫（type-safe）。

<!--rehype:data-language=shell-->
```shell
yarn add feed
```

## 編寫RSS生成方法

在`utils/feed.ts`裡編寫一個`generateRssFeed`方法，其核心在於利用生成一個feed對象，為獲取的每一篇貼文生成feed信息。

<!--rehype:data-language=typescript-->
```typescript
import { Feed } from "feed";

export const generateRssFeed = () => {
  // get posts
  const posts = getAllPosts(['slug', 'title', 'date', 'tags']);
  // constants to provide static info
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const date = new Date();
  const author = {
    // ...
  };

  // generate a feed object with basic info
  const feed = new Feed({
    title: 'The Colorado Lounge',
    id: siteUrl,
    link: `${siteUrl}/the-Colorado-lounge`,
    description: 'YUANCONG.L\'s blog',
    copyright: `All rights reserved ${date.getFullYear()}, YUANCONG.L`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/the-colorado-lounge/rss.xml`,
      json: `${siteUrl}/the-colorado-lounge/feed.json`,
      atom: `${siteUrl}/the-colorado-lounge/atom.xml`,
    },
    author,
  });
}
```

`feed`庫已經幫我們簡化了操作流程，只需要在生成對象的時候註冊基本信息，利用對象方法生成feed時會自動用這些信息來生成。

<!--rehype:data-language=typescript-->
```typescript
// right after the feed object generation
posts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: `${siteUrl}/${getLocale(post.tags[0])}/the-colorado-lounge/${post.slug}`,
    link: `${siteUrl}/${getLocale(post.tags[0])}/the-colorado-lounge/${post.slug}`,
    description: post.title,
    content: post.title,
    date: new Date(post.date),
  });
});
```

## 寫入public目錄

用`fs`庫來幫我們把生成的feed文件寫入public目錄，以便讀取。

<!--rehype:data-language=typescript-->
```typescript
import fs from 'fs';

// right after the `post.forEach`
fs.mkdirSync("./public/rss", { recursive: true });
fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
fs.writeFileSync("./public/rss/feed.json", feed.json1());
```

最後，我們需要保證在build的時候這個`generateRssFeed`方法會被運行，具體做法是將這個方法放在任意一個`getStaticProps`裡，例如`index.tsx`或是博客首頁。

<!--rehype:data-language=typescript-->
```typescript
export const getStaticProps = async () => {
  generateRssFeed();

  // ...
}
```

检查最后生成的feed文件（以`feed.xml`为例）

<!--rehype:data-language=xml-->
```xml
<!-- ... -->
<item>
  <title><![CDATA[Note | 為這個博客的每個頁面設置動態連結]]></title>
  <link>https://www.yuan-cong.com/zh-Hant/the-colorado-lounge/dynamic-post-path</link>
  <guid>https://www.yuan-cong.com/zh-Hant/the-colorado-lounge/dynamic-post-path</guid>
  <pubDate>Wed, 12 Oct 2022 18:24:50 GMT</pubDate>
  <description><![CDATA[Note | 為這個博客的每個頁面設置動態連結]]></description>
  <content:encoded><![CDATA[Note | 為這個博客的每個頁面設置動態連結]]></content:encoded>
</item>
<!-- ... -->
```

成功！！！

---

### 參考

* [RSS Feed in a Next.js site](https://sreetamdas.com/blog/rss-for-nextjs)