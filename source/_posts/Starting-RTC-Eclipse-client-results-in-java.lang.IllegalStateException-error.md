---
layout: post
title: 启动RTC Eclipse client 出现 java.lang.IllegalStateException 错误
tags: [rtc,eclipse,java,IllegalStateException]
date: 2017-04-28 14:50:00
---

> 有时RTC Eclipse打开时，会出现一个报错窗口，提示：An internal error occurred during: "Computing local changes. java.lang.IllegalStateException"。

## 起因
这个问题可能原因有很多，我遇到的情况是，当我多次强制关闭eclipse后，出现这个问题的可能性就很高。

## 症状

计算本地修改遇到问题，无法把项目中的修改文件在Local changes中展示出来，就无法知道哪些文件已经被修改。

## 解决办法

参考： 
[Starting RTC Eclipse client results in java.lang.IllegalStateException error](http://www-01.ibm.com/support/docview.wss?uid=swg21699723)
