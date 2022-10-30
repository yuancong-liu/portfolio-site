---
title: Note | Vue中連接AppSync的GraphQL API
date: 2022-10-30 01:59:38
tags:
- Chinese
- Front-end
- Programming
- Vue
---

最近在做一個需要用到AWS AppSync的GraphQL API的專案，因為做之前甚至沒有聽說過GraphQL，前前後後受折磨好幾週。期間東問西問各種前端前輩，感覺做過GraphQL相關的人完全沒幾個，所以這篇文章來總結一下這邪物。

## 什麼是GraphQL

GraphQL是一種為API設計的數據查詢或修改的語言，使client端能夠使用更直觀和彈性的語法來取得或修改數據。其思想有點類似SQL，使用者通過特定的語法來操作（類似於`SELECT`或`UPDATE`）。

GraphQL API提供一個Schema，client只需要屬於符合Schema的Query，就可以獲得所需的數據。如下例：

```typescript
// Schema
type Query {
  hello: String!
}
```

```typescript
// Query
query {
  hello
}
```

```json
// Response
{
  "data": {
    "hello": "world"
  }
}
```

如果是更複雜的結構：

```typescript
// Schema
type User {
  id: Number,
  name: String
}

type Query {
  me: User
}
```

```typescript
query {
  me {
    id
    name
  }
}
```

```json
{
  "data": {
    "me": {
      "id": 1,
      "name": "Harry Potter"
    }
  }
}
```

由此可見，相比普通的RESTful API，GraphQL進行數據獲取的時候，對於服務器端返回的JSON數據有更直觀的表現。

對於前端，GraphQL API有以下優點：
1. 數據可以按需獲取。不需要的property不寫在Query中，就不會從服務器端返回；
2. 代碼即文檔，一些接口樣式的反覆確認可以被省去（求求後端的朋友們好好起變量名）；
3. 基本可以省去編寫Swagger的時間，前端直接拿一個URL和一個Schema合集就行了；
4. Query與返回數據的結構相同，所以前端可以避免很多數據結構錯誤。

### 和RESTful API有什麼區別？

在典型的RESTful API場景中，請求和響應如下所示：

```typescript
// requests
GET /api/user?id=1
GET /api/address?user_id=1
```

```json
// responses
{
  "id": 1,
  "name": "Harry Potter"
},
{
  "street": "Diagon Alley",
  "city": "London"
}
```

如上面的示例代碼所示，上述請求和響應在GraphQL的情境下一般如下所示：

```typescript
// request
POST /graphql
query {
  user (id: 1) {
    id
    name
    address {
      street
      city
    }
  }
}
```

```json
{
  "user": {
    "id": 1,
    "name": "Harry Potter",
    "address": {
      "street": "Diagon Alley",
      "city": "London"
    }
  }
}
```

從這個例子可以看出，GraphQL API和RESTful API有一個很大的不同點在於，所有的API都用同一個URL，也就是向單一端點API**發布**查詢（所以是POST）。如果將API返回的數據視為圖表，那麼發布的一個查詢可以一次性查閱相關數據，如上例，用一次查詢獲得了RESTful API兩次查詢獲得的數據內容。

對於響應狀態碼，RESTful和GraphQL也有很大區別，RESTful API返回各式各樣的狀態碼，但是GraphQL無論是成功的請求或是失敗的請求都返回`200`，錯誤內容則體現在響應體中。



---
### 參考

* [GraphQL 入門： 簡介 X 範例 X 優缺點](https://ithelp.ithome.com.tw/articles/10200678)
* [GraphQLとRESTの比較](https://hasura.io/learn/ja/graphql/intro-graphql/graphql-vs-rest/)