---
title: Note | 前端項目中AWS AppSync的GraphQL API連結
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

```graphql
# Query
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

```graphql
# Query
query {
  me {
    id
    name
  }
}
```

```json
// Response
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

API請求方式上，RESTful和GraphQL有以下區別：

| 請求方式 | RESTful    | GraphQL  |
|----------|------------|----------|
| 數據取得     | GET     | Query   |
| 數據插入     | POST     | Mutation   |
| 數據更新     | PUT/PATCH/DELETE | Mutation |
| 數據監視/訂閱     | -   | **Subscription** |

### 訂閱（Subscription）

Query和Mutation很好理解，GraphQL比RESTful多出一個數據監視功能，也就是Subscription。介紹GraphQL的Subscription之前，先看看實時API分為哪些種類：
1. **Polling**。客戶端定期發送請求來獲得新數據，這樣的操作很不靈活，很不適合更新不定時，頻率不固定的數據；
2. **Event based subscription**。客戶端（可以是多個）進行數據操作的時候通知服務端，服務端接到數據操作之後，以此為觸發點，通知所有的客戶端。這樣的方法需要提前定義通知客戶端的方法；
3. **Live query**。客戶端發送請求，響應數據有變化的時候，服務端將新的數據推送給客戶端。和訂閱的主要區別在於，數據本身是實時的，不存在基於事件的概念。

GraphQL的訂閱API是基於事件驅動的，具體來講就是基於Mutation。任何一個客戶端通過Mutation修改了數據，就會觸發數據推送。

以以下訂閱的Schema為例：

```graphql
type Subscription {
  subscribeUserStatus(userId: String!): UserStatus
    (mutations: ["updateUserStatus", "updateUserOrders"])
}
```

這是一個叫做`subscribeUserStatus`的訂閱類型，其返回類型是其他地方定義的`UserStatus`對象。這個訂閱的觸發器有兩個，分別是`updateUserStatus`和`updateUserOrders`兩個mutation方法。也就是，只要任意客戶端通過這兩個mutation修改了數據，`subscribeUserStatus`就會將新的數據推送給所有客戶端。

## AWS AppSync相關

本文不涉及後端開發，所以AppSync就簡單介紹一下。

> AWS AppSync 是一項無服務器（Serverless）GraphQL和Pub/Sub API服務，可簡化現代化 Web 和移動應用程序的構建過程。AWS AppSync GraphQL API通過提供一个終端節點来安全地查詢或更新来自多个數據庫、微服務和API的數據，从而簡化應用程序開發。

也就是說，AWS AppSync提供僅僅一個終端節點（Endpoint），讓客戶端可以通過這一個終端節點訪問多個數據庫、API和其他的後端系統的數據。

## 實裝的故事

從這裡開始講講實際項目中的API連結以及我踩的各種各樣的坑。

先介紹一下項目背景。

這個項目是在公司自己做的CMS package上擴張而成的一個內容管理系統，基本開發是php（這一趴與我無關），各種各樣的組件開發是用Vue，項目中有兩個完全用Vue開發的頁面，其中一個用於內容展示（RESTful API），我開發的這一個類似於銀行的叫號管理系統，工作人員可以切換窗口，切換業務類型查看，並且可以進行叫號或者跳過等操作，最重要的是這個系統允許多個工作人員同時操作，為了保持整理券信息的一致性，需要使用實時API來獲得整理券信息的更新。後端的朋友在這裡用了AWS AppSync來開發部署GraphQL API，其中各種各樣的信息訂閱就用到其Subscription API。

* Vue.js: 3.2 (Global API)
* Node.js: 14.20 (Security support ends by April 2023)

### 用Apollo怎麼失敗了？

[Apollo](https://www.apollographql.com/docs/)是一個類似於AppSync的開發平台，可以用於開發部署GraphQL的API。Apollo也提供各種各樣的前端庫來方便客戶端開發，谷歌上搜GraphQL API連結幾乎都是用他家庫做的項目和教程，所以我也開始著手用Apollo的官方Vue庫來開發。

#### 至少還順利的Query和Mutation實現

由於Query和Mutation與Subscription的原理不同，其請求幾乎可以理解為和RESTful API一樣，所以不同的host也不能搞出花樣來。這裡貼一個簡單的Query的例子：

```javascript
const apolloClient = new ApolloClient({
  uri: 'https://rtapi.example.endpoint/graphql',
  headers: {
    'X-Api-Key': 'some_api_key',
  },
  cache: new InMemoryCache(),
});

provideApolloClient(apolloClient);

const { onResult } = useQuery(gql`
    query listData ($someInput: String!) {
        listData (someInput: $someInput) {
            result {
                property1
                property2
                property3
                property4
            }
            statusCode
        }
    }
`, {
    someInput: someInput.value,
});

onResult((result) => {
    dataToDisplay.value = result.data.listData.result;
});
```

基本實現方法是首先定義一個`ApolloClient`並且用`provideApolloClient`將其投入使用，再用`useQuery`方法進行數據請求。其中`useQuery`的返回值不僅有`onResult`，還有`isLoading: Boolean`用於判定數據是否已經到位，`subscribeToMore`用於後續的數據訂閱。


---
### 參考

* [GraphQL 入門： 簡介 X 範例 X 優缺點](https://ithelp.ithome.com.tw/articles/10200678)
* [GraphQLとRESTの比較](https://hasura.io/learn/ja/graphql/intro-graphql/graphql-vs-rest/)
* [Subscribe to data](https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js/)
* [GraphQLにおけるSubscription処理について(実装例: Amplify + AppSync)](https://qiita.com/yoshii0110/items/3d9ec03215537646b65c)
* [AWS AppSync](https://aws.amazon.com/cn/appsync/)
* [失敗から学ぶAppSyncのSubscriptionとかApolloとかPostmanとか](https://thilog.com/failure-appsync-apollo-subscription/)