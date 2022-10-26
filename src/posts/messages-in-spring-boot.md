---
title: Note | Spring Boot Message配置問題
date: 2022-02-16 16:53:41
tags: 
- Chinese
- Programming
- Java
- Spring Boot
- Back-end
---

## 問題
在做課題的時候，有一個要件是在`messages_ja.properties`中定義消息文本，然後在例如Validator中直接用定義的消息名稱來實現消息的本地化。例如：
```
# messages_ja.properties
error.product.notfound=該当のIDは見つかりませんでした
error.product.title.required=商品タイトルは必須です
```
```java
@NotBlank(message = "{error.product.title.required}")
@Size(max = 100, message = "{error.product.title.size}")
private String title;
```
但是不知為何，測試時輸入錯誤數據之後返回的JSON是這樣：
```json
{
    "status": "BAD_REQUEST",
    "timestamp": "2022-02-15T18:49:52.199401",
    "errors": [
        "{error.product.title.required}",
        "{error.product.description.required}",
        "{error.product.price.required}"
    ]
}
```

## 解決
一開始以為是`.porperties`文件沒有被正常讀取，但是以下面方式取得的信息卻可以正常顯示：
```java
messageSource.getMessage("error.productid.notfound", new String[] {}, Locale.JAPANESE)
```
期間也諮詢了mentor，他表示他的環境下可以以日文正常輸出錯誤信息，他懷疑是本地緩存文件損壞，並建議我清除本地緩存並重新啟動（具體：File > Invalidate Caches > Clear file system cache and Local History > Invalidate and Restart）。但是並沒有效果，返回的JSON還是原樣。

之後，參考網上的相似問題（網上似乎沒有人遇到同樣問題，頭tia），設置了一個`messages.properties`來作為默認消息來源，確認其是否可以正常輸出。
```
# messages.properties
error.product.notfound=test
error.product.title.required=test
```
輸出結果如下：
```json
{
    "status": "BAD_REQUEST",
    "timestamp": "2022-02-15T22:46:13.165913",
    "errors": [
        "test",
        "test",
        "test"
    ]
}
```
可以正常輸出，於是思考是否和本機語言設定有關。

本地是中文操作系統，所以新增了一個`messages_zh.properties`來測試：
```
# messages_zh.properties
error.product.notfound=测试
error.product.title.required=测试
```
輸出結果如下：
```json
{
    "status": "BAD_REQUEST",
    "timestamp": "2022-02-15T22:53:00.98922",
    "errors": [
        "测试",
        "测试",
        "测试"
    ]
}
```
可以正常輸出，撒花🎉

並沒有切換到日文版本進行測試，但是至此可見輸出和本地設置有關係。雖然是個弱智問題，應該也很少人碰到，但是一路從第一個課題困擾到了第三個😭
<br>

-全文完-
