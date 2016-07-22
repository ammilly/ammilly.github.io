---
layout: post
title: JavaScript上下文
tags: JavaScript JS context
date: 2016-07-22 11:30:00 +800
---

> 每当一个函数被调用时，JavaScript会创建一个对应的上下文，上下文的创建步骤如下：

1. 创建arguments对象；
2. 创建函数的scope对象；
3. 初始化函数的局部变量；
4. 创建this属性；

<!--more-->

> 其中，this指向的是正在调用该函数的对象。
理解这一点对于理解JavaScript中的函数运行非常关键，因为JavaScript中函数的上下文是在函数被调用的时候才确定的。
