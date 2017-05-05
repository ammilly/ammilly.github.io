---
layout: post
title: contenteditable 使用心得
tags: [contenteditable,div,p]
date: 2017-05-05 11:10:00
---

> 本文介绍一些最近新学习的关于contenteditable属性的使用心得。

## contenteditable 基础

是H5提出的一种新的元素属性，可以让一些不可编辑的元素，如div, p, span等，可以进行编辑。

它的值共包括8种：`""`, `"true"`, `"false"`, `inherit`, `"events"`, `"caret"`, `"typing"`, `"plaintext-only"`。   
其中，各状态需要注意的点如下：
* ""和"true"均表示让元素为可编辑状态
* "false"表示元素不可编辑
* inherit表示该元素会继承其父元素的状态，也是默认的缺省状态
* "events", "caret", "typing" 和 "true"，这几种状态从左到右具有继承关系，即"caret"包含"events"属性的所有特性，"typing"包含"caret"的所有特性，"true"包含"typing"的所有特性
* "plaintext-only"已不支持

## 事件

* onInput - 当用户键入内容时触发
* onBlur - 当元素失去焦点时触发
* onKeyDown - 当用户使用键盘键入时，可获取当前用户按的键

## 相关知识

1. 如何取消contenteditable元素的换行功能

把元素加上onKeyDown事件监听，在事件处事函数中加上对keyCode的判断，若为`13`，即`Enter`键对应的code，则把动作取消即可。实现如下：   
```JavaScript
onKeyDown(e) {
	if(e.keyCode === 13) {
		e.preventDefault();
	}
}
```
2. 如何取消contenteditable元素的粘贴功能

监听onPaste事件，直接取消动作。实现如下：   
```JavaScript
onPaste(e) {
    e.preventDefault();
}
```
3. [如何让contenteditable元素只能输入纯文本](http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/)


参考   
[W3C ContentEditable](https://w3c.github.io/editing/contentEditable.html)
