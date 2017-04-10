---
layout: post
title: JS中两个!!的用法
tags: JavaScript JS markable double
date: 2016-07-22 11:33:00 +800
---

> 两个感叹号的作用就在于，如果明确设置了变量的值（非null/undifined/0/""等值),结果就会根据变量的实际值来返回，如果没有设置，结果就会返回false。

<!--more-->

如下例子：

```javascript
var foo;
alert(!foo); // undefined情况下，一个感叹号返回true
alert(!goo); // null情况下，一个感叹号同样返回true

var obj = {flag:true};
var test = !!obj.flag; // 等效于var test = obj.flag || false;
alert(test);
```