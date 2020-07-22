##### 圣杯布局和双飞翼布局
-	两侧定宽，中间自适应
-	圣杯:中间的div设置左右padding，之后设置左右的position：relative和margin
-	双飞翼：在中间中创建子div存放内容，子div使用margin来预留左右块的位置

---

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

---

####	页面上隐藏元素的方法
-	占位
	visibility:hidden：将元素隐藏，还是存在原先的位置，只是不可见了而已，不会改变文档的布局（visibility：hidden是继承属性，子孙节点消失是由于继承了hidden）
	margin：-100%：只是将元素的位置改变到我们看不见的地方，并不会让元素消失，元素依然存在
	opacity:0：设置元素的透明度为0，说明元素是透明的是，元素只是变透明了人眼不可见了，但元素并没有消失
	transform:scale(0)：将元素进行缩小到看不见，但是其实元素还是会在文档的位置
-	不占位
	display:none：将元素设为不可见，从文档中去除（display：none,不可继承）；

	width：0，height：0;

	z-index：层级设置为最低，在全部的元素的下面，将看不见该元素
---


