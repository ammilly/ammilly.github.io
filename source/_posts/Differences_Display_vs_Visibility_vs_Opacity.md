---
layout: post
title: Display vs Visibility vs Opacity 三者之间的区别
tags: [css,display,visibility,opacity]
date: 2017-04-25 15:44:00
---

> 本文介绍隐藏HTML元素的三种方式之间的区别

## 需要隐藏元素时，可以采用3种方式：display: none; visibility: hidden; opacity: 0;。

### 三者之间的区别可以用下表说明：

|            | Display: none | Visibility: hidden; | Opacity: 0; |
| ---------- | :------------:  | :-------------------: | :-----------: |
| Collapses  |  [x] |  X  |  X  |
| Events     |   X  |  X  |  [x]  |
| Taborder   |   X  |  X  |  [x]  |
| Animatable |   X  |  X  |  [x]  |

上表详细说明了这三种样式下，元素对应不同操作的反应：

* Collapses - 表示元素是否占用文档空间，即是否存在于文档流中。
* Events - 元素对事件的反应，如click事件。
* Taborder - 元素是否包含在taborder中，即tab可否获取焦点。
* Animatable - 是否可以在可见与不可见元素之间过渡动画。

> 由此可知，如果想让一个元素彻底消失，不占用任何空间，使用display: none;。   
如果想让元素在可见的时候具有动画效果，使用opacity: 0;   
而visibility: hidden;的元素仍然占用文档空间。
