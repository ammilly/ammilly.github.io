---
layout: post
title: 如何在Windows git bash中拷贝文件内容
tags: git bash win7
date: 2016-07-22 11:40:00 +800
---

> 在Win7中，很多人喜欢下载git bash终端，本文记录如何在shell中快速拷贝/粘贴一个文件的内容。

<!--more-->

## 拷贝文件

```shell
$ cat filename > /dev/clipboard
```

## 粘贴剪贴板内容到文件

```shell
$ cat /dev/clipboard > filename
```

## 查看剪贴板内容

```shell
$ cat /dev/clipboard
```
