#####	(1)页面导入的时候，使用link接@import有什么区别
-	link是HTML标签，@import是css提供的语法规则（link可以加载css之外还可以定义RSS，定义rel连接属性。@import只能加载css）
-	link引入的样式和页面同时进行加载，@import引入的样式在加载完之后进行加载
-	兼容方面：link没有兼容问题，@import在ie5以下不兼容
-	link可以通过js操作DOM动态引用样式表改变样式，@import不可以
-	link引入样式的权重大于@import引入样式
（css权重优先级：!important>行内>Id>类、伪类、属性>标签>继承>通配符)
>>	link:定义文档和外部资源的关系。href：链接文档的位置；media：媒体查询；rel:当前文档和链接文档的关系;type:链接文档的MIME类型。
---

##### 圣杯布局和双飞翼布局
-	两侧定宽，中间自适应
-	圣杯:中间的div设置左右padding，之后设置左右的position：relative和margin
-	双飞翼：在中间中创建子div存放内容，子div使用margin来预留左右块的位置

####	CSS3有哪些新特性
-	边框(borders)
	border-radius:圆角
	box-shadow:盒阴影
	border-image:边框图像
-	背景
	background-size:背景图片的尺寸
	background-origin:背景图片的定位
	background-clip:背景图片的绘制区域
-	渐变
	liner-gradient：线性渐变
	radial-gradient：径向渐变
-	trnsform
-	transition
-	动画
	@keyframes
-	弹性盒子
-	媒体查询