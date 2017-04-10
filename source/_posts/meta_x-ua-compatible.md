---
layout: post
title: Meta http-equiv属性值X-UA-Compatible
tags: [meta,X-UA-Compatible,http-equiv]
date: 2016-07-27 17:00:00 +800
---

> X-UA-Compatible是IE8的一个专有meta属性，对于IE8以下的浏览器是不识别的。通过在meta中设置## X-UA-Compatible的值，可以指定网页的兼容性模式。在HTML的`<head>`标签中使用。

<!--more-->

## Why X-UA-Compatible

在IE8刚推出时，由于重构的问题，无法适应较高级的浏览器，所以使用X-UA-Compatible标签强制IE8采用低版本方式渲染。

使用下面代码后，开发者无需考虑网页是否兼容IE8，只要确保网页在IE6、IE7下的表现就可以了。

```html
<!-- emulate仿真 -->
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
```

### 使用Edge引擎渲染网页

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

### 使用Edge引擎渲染网页，同时启用Google Chrome Frame

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

Google Chrome Frame，官方正式中文名“谷歌浏览器内嵌框架”，是Google推出的一款免费IE专用插件，使用该插件，用户可以通过IE的用户界面，以Chrome内核的渲染方式浏览网页。Chrome Frame会把最新的Chrome Webkit内核和JavaScript引擎注入到IE中。

通过在页面中加入上面一行代码，当安装有Chrome Frame插件的IE浏览器发现这行代码时，马上使用基于Webkit的Chrome渲染引擎替换IE自身的渲染引擎，而其它浏览器将忽略此行代码，不会影响代码执行。

