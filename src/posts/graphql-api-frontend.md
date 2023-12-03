---
title: Note | 前端項目中AWS AppSync的GraphQL API連結
date: 2022-10-30 01:59:38
language: 中文
tags:
- Front-end
- Programming
- Vue
---

最近在做一個需要用到AWS AppSync的GraphQL API的專案，因為做之前甚至沒有聽說過GraphQL，前前後後受折磨好幾週。期間東問西問各種前端前輩，感覺做過GraphQL相關的人完全沒幾個，所以這篇文章來總結一下這邪物。

## 什麼是GraphQL

GraphQL是一種為API設計的數據查詢或修改的語言，使client端能夠使用更直觀和彈性的語法來取得或修改數據。其思想有點類似SQL，使用者通過特定的語法來操作（類似於`SELECT`或`UPDATE`）。

GraphQL API提供一個Schema，client只需要屬於符合Schema的Query，就可以獲得所需的數據。如下例：

<!--rehype:data-language=typescript-->
```typescript
// Schema
type Query {
  hello: String!
}
```

<!--rehype:data-language=graphql-->
```graphql
# Query
query {
  hello
}
```

<!--rehype:data-language=json-->
```json
// Response
{
  "data": {
    "hello": "world"
  }
}
```

如果是更複雜的結構：

<!--rehype:data-language=typescript-->
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

<!--rehype:data-language=graphql-->
```graphql
# Query
query {
  me {
    id
    name
  }
}
```

<!--rehype:data-language=json-->
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

<!--rehype:data-language=typescript-->
```typescript
// requests
GET /api/user?id=1
GET /api/address?user_id=1
```

<!--rehype:data-language=json-->
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

<!--rehype:data-language=typescript-->
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

<!--rehype:data-language=json-->
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

<!--rehype:data-language=graphql-->
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

<!--rehype:data-language=javascript-->
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

其中用到一個叫做`graphql-tag`的庫來進行query字符串的預處理（`gql`方法），它將把它包起來的GraphQL查詢字符串解析為標準GraphQL AST用於發送請求。

#### Subscription怎麼就搞不動了？

先說結論，失敗的原因是因為AppSync接收Subscription請求的形式和Apollo發送的請求形式不吻合。

**AppSync接受**的請求形式：

<!--rehype:data-language=json-->
```json
{
  "id": id,
  "type": "start",
  "payload": {
    "data": {
      "query": query,
      "variables": { variable: variable },
    },
    "extensions": {
      authorization: {
        host: endpoint,
        "x-api-key": apikey,
      }
    },
  }
}
```

**Apollo發送**的請求形式：

<!--rehype:data-language=json-->
```json
{
  "id": subscriptionId,
  "type": "start",
  "payload": {
    "variables": {},
    "extensions": {},
    "operationName": subscriptionName,
    "query": query
  }
}
```

AppSync接受的请求形式中，本该直接出现`query`的地方多了一层`data`，结果就导致了`UnsupportedOperation`错误的发生：

<!--rehype:data-language=json-->
```json
{
  "type": "error",
  "id": "",
  "payload": {
    "errors": [{
      "errorType": "UnsupportedOperation",
      "message": "unknown not supported through the realtime channel"
    }]
  }
}
```

除此之外，AppSync還會返回`start_ack`信息，而這不在Apollo所使用的WebSocket方法的生命週期里，所以可以說兩者几乎是完全不適配。並且，向GraphQL端點發送請求時，需要在端點的字符串後自行處理加上轉換成`base64`的頭部（包括`header`和`payload`）。由於`gql`是自動生成，並沒有找到可以自定義請求體結構的方法，所以這條路以失敗告終。

### 用Amplify來實現

其實最開始就應該用Amplify的，腸子都悔青了⋯⋯用Apollo來實現的感覺就像買了iPhone卻強行要用華為手錶一樣。但是很恐怖的是，網上關於只用Amplify庫而不在AWS上部署Amplify應用程序的文章太少，導致我大走彎路。

先講講是怎麼成功的。

#### Schema的自動取得等

首先按照AppSync Console的教程，先把GraphQL的Schema全部拉取下來。

<!--rehype:data-language=shell-->
```shell
npm install -g @aws-amplify/cli
amplify init
amplify add codegen --apiId some_api_id
amplify codegen
```

讓我直接暈死的點就在這裡，根據步驟會生成一大堆文件，甚至還會直接告訴你需要部署一個Amplify App在AWS。由於生成的大部分文件都在`.gitignore`裡，當下我就陷入思考：這麼多本地文件，部署的時候該怎麼辦？？

其實到此為止，我們其實只需要用到Amplify cli幫忙取得的Schema文件，也就是`./src/graphql`中的文件，除此之外，還有一個叫做`aws-exports.js`的文件，當API KEY之類的過期或更新的時候，`amplify codegen`會重新幫我們生成這些文件。

`.gitignore`裡面被添加的那些本地配置文件通通都可以刪除，那些都是需要部署Amplify APP才需要用到的文件。

為了讓全局都可以使用這個GraphQL端點，首先在`app.js`裡進行配置：

<!--rehype:data-language=javascript-->
```javascript
import Amplify from 'aws-amplify';

Amplify.configure({
    aws_appsync_graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || '',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: process.env.APPSYNC_API_KEY || '',
});
```

各大教程裡面都是這樣寫：`Amplify.configure(aws_exports);`，但如果我需要在部署的時候再多生成一個`aws_exports.js`文件，那需要很多額外設置，所以`aws_appsync_graphqlEndpoint`和`aws_appsync_apiKey`就交給環境變量來解決了。

#### API請求

設置結束之後，我們就可以在組件裡進行API請求了。比起Apollo，由於我們有自動生成的Schema文件（其實Apollo也可以使用提前定義的Schema，但是實在是太多我又很懶，所以沒弄），所以實現起來非常快。

首先，編寫這樣的方法：

<!--rehype:data-language=javascript-->
```javascript
import { API, graphqlOperation } from 'aws-amplify';
import { listUserData } from '@/../src/graphql/queries';

const fetchUserData = async () => {
  await API.graphql(
    graphqlOperation(
      listUserData,
      {
        userGroupId: userGroupId.value,
      }
    )
  ).then((res) => {
    userData.value = res.data.listUserData.result.sort((a, b) => {
      return a.userId - b.userId;
    });
  });
};
```

其中，像一般的promise一樣，用`then()`來指定有響應之後的操作。同理，mutation也用類似的方法實現：

<!--rehype:data-language=javascript-->
```javascript
import { updateUserStatus } from '@/../src/graphql/mutations';

const mutateUserData = async () => {
  await API.graphql(
    graphqlOperation(
      updateTicketStatus,
      {
        input: {
          userId: userId.value,
          groupId: groupId,
          userStatus: userStatus,
        },
      }
    )
  ).then(() => {
    console.log("user status updated!")
  }).catch(() => {
    console.log("user status update failed!")
  });
};
```

subscribe的實現方法也類似，不過需要加上`subscribe()`處理：

<!--rehype:data-language=javascript-->
```javascript
import { subscribeUserData } from '@/../src/graphql/subscriptions';

const subscribeToUserData = async () => {
  await API.graphql(
    graphqlOperation(
      subscribeUserData,
      {
        userGroupId: userGroupId.value,
      }
    )
  ).subscribe({
    next: (res) => {
      if (!res.value.data.subscribeUserData) return;
      const changedUser = res.value.data.subscribeUserData.result;
      const changedUserIndex = users.value?.findIndex((user) => user.userId === changedUser.userId);
      if (changedUserIndex === -1) {
        users.value.push(changedUser);
        users.value.sort((a, b) => a.userId - b.userId);
      } else {
        users.value[changedUserIndex] = changedUser;
      }
    },
    error: () => {
      console.log("error occurred!")
    },
  });
};
```

在`subscribe()`方法中，`next`用於定義正常獲得更新數據之後的操作，`error`用於定義異常的處理。在上面的例子中，數據更新時只返回一個用戶的數據，所以在`next`的定義中找到有更新的用戶，並用新數據替換舊數據。

最後，為了讓數據獲取和訂閱的方法在插入組件樹的時候運行，把上面的`fetchUserData()`和`subscribeToUserData()`放進`onMounted()`中：

<!--rehype:data-language=javascript-->
```javascript
onMounted(async () => {
  await fetchUserData();
  await subscribeToUserData();
});
```

這樣一來，數據獲取和訂閱就完成了。

#### 實時監測WebSocket的連結狀況

按照項目需求，當網絡出現狀況，WebSocket的網絡連結狀況處於pending的時候，需要顯示網絡故障的文字。可是，網絡故障時，本身就不會返回新數據，所以不能在`subscribe()`的`error`中定義行為。

這裡可以用到Amplify的`Hub.listen()`來實時監聽api的連結情況。

<!--rehype:data-language=javascript-->
```javascript
import { Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';

Hub.listen('api', async (data) => {
  if (data.payload.event === CONNECTION_STATE_CHANGE) {
    if (data.payload.data.connectionState === ConnectionState.ConnectedPendingNetwork) {
      shouldDisplayConnectionError.value = true;
    } else {
      shouldDisplayConnectionError.value = false;
      await fetchUserData();
    }
  }
});
```

在Hub監聽api的過程中，有各種各樣的事件數據返回，其中要提取的就是`CONNECTION_STATE_CHANGE`即網絡連結狀態改變事件，當事件發生時，事件本身作為觸發器觸發狀態的改變。

`ConnectionState`有以下狀態，可以結合實際需求和情境用於判定等。

<!--rehype:data-language=markdown-->
```markdown
* Connected - Connected and working with no issues.
* ConnectedPendingDisconnect - The connection has no active subscriptions and is disconnecting.
* ConnectedPendingKeepAlive - The connection is open, but has missed expected keep alive messages.
* ConnectedPendingNetwork - The connection is open, but the network connection has been disrupted. When the network recovers, the connection will continue serving traffic.
* Connecting - Attempting to connect.
* ConnectionDisrupted - The connection is disrupted and the network is available.
* ConnectionDisruptedPendingNetwork - The connection is disrupted and the network connection is unavailable.
* Disconnected - Connection has no active subscriptions and is disconnecting.
```

### おまけ - 突然不用API KEY，要用LAMBDA TOKEN來認證？？知道這個消息的我的心路歷程

當我開開心心提出review請求的時候，突然被後端告知

> 我們不用`API KEY`而是用`LAMBDA TOKEN`來認證。
> 具體做法是用戶登錄之後會生成token（存儲在cookies中），而這個token就是用於認證的`LAMBDA TOKEN`。

我打開`Amplify.configure()`的文檔，卻發現我可以把`aws_appsync_authenticationType`改成`AWS_LAMBDA`，卻沒有一個欄位讓我放下token值。

這時候救我命的是突然浮窗出現的`graphqlOperation()`的文檔，其方法簽名如下：

<!--rehype:data-language=typescript-->
```typescript
export declare const graphqlOperation: (query: any, variables?: {}, authToken?: string, userAgentSuffix?: string) => {
  query: any;
  variables: {};
  authToken: string;
  userAgentSuffix: string;
};
```

雖然要在訪問API的地方一個一個設置，但是在`variable`之後是可以直接加上`authToken`的。

由於API訪問分布在各個組件中，所以在每一個組件中取得一次cookies顯然不現實。我的做法是在app.js（`Amplify.configure()`的附近）從cookies中獲取一次token，再將其作為全局變量注入各個組件。

<!--rehype:data-language=javascript-->
```javascript
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const accessToken = cookies.get('access_token');
app.provide('accessToken', accessToken);
```

需要注意的是，在vue的全局API中如果用這樣的語句`app.config.globalProperties.foo = 'bar';`設置全局變量，在組件中是獲取不到的，需要用到`inject()`來注入。

在組件中取用的時候如下：

<!--rehype:data-language=javascript-->
```javascript
import { inject } from 'vue';
const accessToken = inject('accessToken');
```

最後把獲取到的token放在`graphqlOperation()`的第三個參數就大功告成了！

<!--rehype:data-language=javascript-->
```javascript
// ...
await API.graphql(
  graphqlOperation(
    listUserData,
    {
      userGroupId: userGroupId.value,
    },
    accessToken
  )
).then((res) => {
// ...
```

---
### 參考

* [GraphQL 入門： 簡介 X 範例 X 優缺點](https://ithelp.ithome.com.tw/articles/10200678)
* [GraphQLとRESTの比較](https://hasura.io/learn/ja/graphql/intro-graphql/graphql-vs-rest/)
* [GraphQLにおけるSubscription処理について(実装例: Amplify + AppSync)](https://qiita.com/yoshii0110/items/3d9ec03215537646b65c)
* [AWS AppSync](https://aws.amazon.com/cn/appsync/)
* [失敗から学ぶAppSyncのSubscriptionとかApolloとかPostmanとか](https://thilog.com/failure-appsync-apollo-subscription/)
* [API (GraphQL) - Subscribe to data - JavaScript - AWS Amplify Docs](https://docs.amplify.aws/lib/graphqlapi/subscribe-data/q/platform/js/)
* [API (GraphQL) - Configure authorization modes - JavaScript - AWS Amplify Docs](https://docs.amplify.aws/lib/graphqlapi/authz/q/platform/js/)