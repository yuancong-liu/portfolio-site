---
title: Note | 用Spring Boot和Thymeleaf製作Todo系統 <#1>
date: 2022-02-16 17:23:14
tags:
- Chinese
- Programming
- Spring Boot
- Thymeleaf
- Java
- Back-end
- Front-end
---

## 要求
- Java 11
- MySQL 5.7

## 前期準備
用[Spring Initializer](https://start.spring.io)生成模板文件。

| 項目名      |         設定值 |
| :---------- | -------------: |
| Project     | Gradle Project |
| Spring Boot |          2.6.3 |
| Language    |           Java |
| Packaging   |            Jar |
| Java        |             11 |

添加以下Dependencies：
- Developer Tools > Spring Boot DevTools
- Developer Tools > Lombok
- Web > Spring Web
- Template Engines > Thymeleaf
- SQL > Spring Data JPA
- SQL > MySQL Driver
- I/O > Validation

生成的項目結構如下所示：
```markdown
├── HELP.md
├── README.md
├── build
├── build.gradle
├── gradle
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── xxx
    │   │           └── xxx
    │   │               └── todo
    │   │                   └── TodoApplication.java
    │   │                   
    │   └── resources
    │       ├── application.properties
    │       ├── static
    │       └── templates
    └── test
```

打開終端機，輸入以下指令來創建新數據庫：
```shell
mysql -uroot
create database `todo`;
```

在新建的Spring Boot項目的/resource目錄下的application.properties中添加以下：
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todo
spring.datasource.username=root
spring.datasource.password=
spring.datasource.initialization-mode=always
```

## 數據庫方面
### 創建數據庫表
```sql
create table if not exists `todo` (
    `id` bigint(20) unsigned not null auto_increment comment 'id',
    `title` varchar(30) not null comment '標題',
    `deadline` date not null comment '截止日期',
    `status` tinyint(1) not null default '0' comment '狀態',
    `create_time` datetime not null default current_timestamp comment '創建時間',
    `update_time` datetime not null default current_timestamp on update current_timestamp comment '更新時間',
    primary key (`id`),
    unique key `title_unique` (`title`)
) engine=innodb default charset=utf8mb4 comment='todo表';
```
注：由於MySQL沒有boolean類型，所以用TINYINT(1)來切換狀態(0/1)。

## 一開始
### 實體類
為了和數據庫中的實體一一對應，需要創建實體類。
在`src/main/java/com/xxx/xxx/todo/entity`目錄下創建`Todo.java`類：
```java
@Data
@Entity
public class Todo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private LocalDate deadline;
  private boolean status;

  @CreationTimestamp private LocalDateTime createTime;
  @UpdateTimestamp private LocalDateTime updateTime;

}
```
使得每個todo實體的屬性和數據庫中的屬性一致。

### 倉庫接口
在`src/main/java/com/xxx/xxx/todo/repository`目錄下創建`TodoRepository.java`接口類：
```java
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {}
```

### 服務類
在`src/main/java/com/xxx/xxx/todo/service`目錄下創建`TodoService.java`類：
```java
@Service
@Transactional
@RequiredArgsConstructor
public class TodoService {

  private final TodoRepository todoRepository;

  public List<Todo> searchAllTodo() {
    return todoRepository.findAll();
  }
}
```
`searchAllTodo()`方法調用倉庫接口，查詢所有數據庫中的todo條目。

### 控制器類
首先先實現在首頁顯示所有的todo條目的機能。
在`src/main/java/com/xxx/xxx/todo/controller`目錄下創建`TodoController.java`類：
```java
@Controller
@RequiredArgsConstructor
public class TodoController {

  private final TodoService todoService;

  @GetMapping
  public String index(Model model) {
    model.addAttribute("todoList", todoService.searchAllTodo());
    return "index";
  }
}
```
至此，一個簡單的Spring Boot的結構（實體，服務，倉庫和控制器）就實現了。

### 畫面顯示
為了把控制器添加到模型裡的attribute顯示在畫面上，在HTML方面需要用Thymeleaf讀取。
首先在`/src/main/resources/templates`目錄下添加`index.html`文件，在`<body></body>`中添加以下：
```html
<table>
  <tr>
    <th>標題</th>
    <th>截止日期</th>
    <th>狀態</th>
  </tr>
  <tr th:each="todo : ${todoList}" th:object="${todo}">
    <td th:text="*{title}"></td>
    <td th:text="${#temporals.format(todo.deadline, 'yyyy年MM月dd日')}"></td>
    <td>
      <span th:if="${todo.status}">完成</span>
      <span th:unless="${todo.status}">未完成</span>
    </td>
  </tr>
</table>
```
標籤中的`th:xxx`的用途則是將從後端接收到的信息替換在標籤內容中，從後段接收到的信息用`${xxx}`來表示。
至此，可以顯示todo list的首頁完成了。
<br>

-全文完-