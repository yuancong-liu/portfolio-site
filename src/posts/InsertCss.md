---
title: Note | Spring Boot插入外部CSS樣式表
date: 2022-03-09 01:59:38
tags:
- Chinese
- Front-end
- Back-end
- Spring Boot
- Programming
- Java
---

## 問題

在課題中，要求在引用Bootstrap之外引入外部樣式表來定義錯誤信息的文字樣式。

我嘗試了以下兩種方法：
```html
<!-- method 1 -->
<link href="/css/stylesheet.css" rel="stylesheet">

<!-- method 2 with Thymeleaf-->
<link th:href="/css/stylesheet.css" rel="stylesheet">
```

但是奇怪的是，兩種方法都行不通，當初我以為是引入的Bootstrap把我自己的樣式表覆蓋了，於是我按照網路上的說法，在Bootstrap引用之後才引用自己的樣式表。

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link href="/css/stylesheet.css" rel="stylesheet">
```

但是依舊行不通。我把Bootstrap給注釋掉，來檢查CSS文件能不能正常讀取，發現文件並沒有被正常讀取。

## 解決

我於是查找關於Spring Boot的外部CSS樣式表的引用相關。發現是自己的文件路徑的問題。

Spring Boot項目的文件路徑如下：

```markdown
└── resources
    ├── static
    ├── templates
    │   ├── index.html
    │   └── ... 
    └── ...
```

在上面的嘗試中，我都將樣式表文件放在`templates/css`路徑下。但是Spring Boot的默認CSS/JS讀取路徑是`static/`。

所以把文件放在上述路徑下就可以正常讀取了，並且上述兩種方法都可以正常讀取樣式表。
<br>

-全文完-