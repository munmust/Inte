##### 圣杯布局和双飞翼布局

- 两侧定宽，中间自适应
- 圣杯:中间的div设置左右padding，之后设置左右的position：relative和margin
- 双飞翼：在中间中创建子div存放内容，子div使用margin来预留左右块的位置

#### CSS3有哪些新特性

- 边框(borders)
 border-radius:圆角
 box-shadow:盒阴影
 border-image:边框图像
- 背景
 background-size:背景图片的尺寸
 background-origin:背景图片的定位
 background-clip:背景图片的绘制区域
- 渐变
 liner-gradient：线性渐变
 radial-gradient：径向渐变
- transform
- transition
- 动画
 @keyframes
- 弹性盒子
- 媒体查询


#### BFC的理解

块级格式化上下文，独立的一个空间，里面的元素的改变不会影响到外部的元素
同个BFC中的元素发生外边距折叠
清除浮动
阻止浮动元素的覆盖

#### 如何创建一个三角形

使用border来做
width:0;height:0;
border-top:50px solid transparent;
border-left:50px solid transparent;
border-right:50px solid transparent;
border-bottom:50px solid red;
