---
title: Note | 在WebMvcConfiguration介面中配置過濾器（Filter）
date: 2022-03-05 20:57:50
language: 中文
tags:
- Programming
- Java
- Spring Boot
- Back-end
---

## 問題

課題中用到兩個過濾器，一個是用於輸出日誌到文本文件的`LoggingFilter`，另一個是用於檢查請求中是否有合規的Bearer Token的`TokenFilter`。

簡單寫一下兩個過濾器的定義：
<!--rehype:data-language=java-->
```java
//TokenFilter.java
@Component
@RequiredArgsConstructor
public class TokenFilter extends OncePerRequestFilter {
  private final TokenService tokenService;
  private final ObjectMapper objectMapper;
  private final MessageSource messageSource;

  @Override
  protected void doFilterInternal() {/*...*/}
}
```

<!--rehype:data-language=java-->
```java
//LoggingFilter.java
@Component
public class LoggingFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal() {/*...*/}
}
```

在之前，路徑匹配是直接定義在`doFilterInternal()`方法中的：
<!--rehype:data-language=java-->
```java
if (httpServletRequest.getRequestURI().equals(/*requested url */)) {/*...*/}
```

為了簡化程序，需要把這兩個過濾器的路徑匹配轉移到`WebMvcConfiguration`介面中完成。

## 解決

用Lombok的`@RequiredArgsConstructor`註解在`WebMvcConfiguration`類中直接聲明兩個過濾器：
<!--rehype:data-language=java-->
```java
//WebMvcConfig.java
@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
  private final LoggingFilter loggingFilter;
  private final TokenFilter tokenFilter;
  //...
}
```
這樣在註冊過濾器的時候就不再需要用構造函數來創建實例了。

之後註冊新的過濾器（有兩個過濾器，所以需要寫兩個方法，這裡只展示一個）。
<!--rehype:data-language=java-->
```java
//WebMvcConfig.java
@Bean
FilterRegistrationBean<LoggingFilter> loggingFilterRegistration() {
  FilterRegistrationBean<LoggingFilter> filterRegistrationBean = new FilterRegistrationBean<>(loggingFilter);

  filterRegistrationBean.addUrlPatterns("/api/products", "/api/products/*");
  filterRegistrationBean.setName("Logging Filter");
  filterRegistrationBean.setOrder(1);

  return filterRegistrationBean;
}
```

有幾個需要注意的地方：
1. 由於泛型的關係，如果只寫`FilterRegistrationBean<>`或是直接寫`FilterRegistrationBean`會被編譯器認為是不安全的行為，不能通過編譯；
2. 幾個過濾器可以通過`filterRegistrationBean.setOrder(/*number*/)`來設定過濾器的發動順序，數字越小越優先，同時可以用`Ordered.HIGHEST_PRECEDENCE`和`Ordered.LOWEST_PRECEDENCE`來設置為最優先和最不優先（實質就是Integer可取範圍的最小值和最大值）。
<br>

