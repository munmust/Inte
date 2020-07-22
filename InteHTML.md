#####	(1)页面导入的时候，使用link接@import有什么区别
-	link是HTML标签，@import是css提供的语法规则（link可以加载css之外还可以定义RSS，定义rel连接属性。@import只能加载css）
-	link引入的样式和页面同时进行加载，@import引入的样式在加载完之后进行加载
-	兼容方面：link没有兼容问题，@import在ie5以下不兼容
-	link可以通过js操作DOM动态引用样式表改变样式，@import不可以
-	link引入样式的权重大于@import引入样式
（css权重优先级：!important>行内>Id>类、伪类、属性>标签>继承>通配符)
>>	link:定义文档和外部资源的关系。href：链接文档的位置；media：媒体查询；rel:当前文档和链接文档的关系;type:链接文档的MIME类型。

---

### HTML的全局属性
-	style：行内css样式
-	class：元素类标识
-	data-*：自定义属性
-	dir：文本方向
-	draggable：是否可拖动
-	id：元素id，文档内唯一
-	lang：元素的语言
-	title：元素有关的额外信息
-	事件处理程序（onEvent)
-	aria-*：提供描述

---

####    HTML5的文件离线储存