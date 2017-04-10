---
layout: post
title: ES6 函数扩展
tags: [es6,es2015,function]
date: 2016-07-22 13:18:00 +800
---

> ES6允许为函数参数设置默认值，即直接写在参数定义后面。函数参数默认值还可以与解构赋值(destructuring)的默认值，结合起来使用。

<!--more-->

### 参数默认值

### 基本用法

ES6允许为函数参数设置默认值，即直接写在参数定义后面。

```javascript
function log(x, y = 'world') {
    console.log(x, y);
}

log('Hello');   // Hello world
log('Hello', 'China');  // Hello China
log('Hello', '');   // Hello 
```

ES6的写法非常简洁自然，如下例子：

```javascript
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

var p = new Point();
p // {x:0, y:0}
```

除了简洁，ES6的写法还有两个好处：
- 阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；
- 有利于将来代码的优化，即使未来的版本在对外接口中，彻底去掉这个参数，也不会导致以前的代码无法运行。

参数变量是默认声明的，所以不能用`let`或`const`再次声明。

```javascript
function foo(x = 0) {
    let x = 1; // error
    const x = 2; // error
}
```

上面代码中，参数变量`x`是默认声明的，在函数体中，不能用`let`或`const`再次声明，否则会报错。

### 与解构赋值默认值结合使用

函数参数默认值是可以与解构赋值(destructuring)的默认值，结合起来使用。

```javascript
function foo({x, y = 1}) {
    console.log(x, y);
}

foo({});    // undefined 1
foo({x: 1});    // 1 1
foo({x:1, y: 2});   // 1 2
foo();  // TypeError: Cannot match against 'undefined' or 'null'.
```

上面代码使用了对象的解构赋值默认值，只有当函数`foo`的参数是一个对象时，变量`x`和`y`才会通过解构赋值生成，如果函数`foo`调用时参数不是对象，就无法进行解构赋值，从而报错。

### 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾参数设置默认值，其实这个参数是没法省略的。

```javascript
function f(x = 1, y) {
    return [x, y];
}

f();    // [1, undefined]
f(1);   // [1, undefined]
f(,1);  // [1, 1]
f(undefined, 1);    // [1, 1]

function func(x, y = 1, z) {
    return [x, y, z];
}

func();    // [undefined, 1, undefined]
func(1);    // [1, 1, undefined]
func(1, ,2);    // 报错
func(1, undefined, 2);  // [1, 1, 2]
```

上面例子中，有默认值的参数都不是尾参数，此时，无法只省略该参数，而不省略它后面的参数，除非显示传入`undefined`。

### 函数的`length`属性

函数指定了默认值后，函数的`length`属性返回的就不再是函数参数个数，而是第一个指定默认值的前面参数个数。也就是说指定了默认值后，函数的`length`属性将失真。

```javascript
(function(a) {}).length // 1
(function(a = 1) {}).length // 0
(function(a, b, c = 1, d) {}).length   // 2
(function(...args) {}).length   // 0
```

这是因为`length`属性的含义是，该函数预期传入的参数个数，某个参数指定默认值后，预期传入的参数个数就不包括这个参数及其后面的参数。同时，Rest参数也不会计入`length`属性。

### 作用域

一个需要注意的地方，如果参数默认值是一个变量，则该变量所处的作用域与其它变量的作用域一样，即先是当前函数的作用域，然后才是全局作用域。

### 应用

利用参数默认值，可以指定某个参数不得省略，如果省略则抛出一个错误。

```javascript
function throwIfMissing() {
    throw new Error("Missing parameter");
}

function foo(mustBeGiven = throwIfMissing()) {
    return mustBeGiven;
}

foo(); // Error: Missing parameter
```

上面代码中`foo`函数，如果调用的时候没有给出参数，则会调用默认值`throwIfMissing`函数，从而抛出一个错误。

此外，还可以将参数默认值设为`undefined`，表明这个参数是可以省略的。

```javascript
function foo(optional = undefined) { ... }
```

### Rest参数

Rest参数接收函数的多余参数，组成一个数组，放在形参的最后，形式如下：

```javascript
function func(a, b, ...theArgs) {
    // ...
}
```

#### Rest参数和arguments对象的区别
- rest参数只包括那些没有给出名称的参数，arguments包含所有参数；
- arguments对象不是真正的array，而rest参数是Array的实例，可以直接应用sort, map, forEach, pop等方法；
- arguments对象拥有一些自己额外的功能。

#### 从arguments转向数组

Rest参数简化了使用arguments获取多余参数的方法。

```javascript
// Before rest parameters, the following could be found
function func(a, b) {
    var args = Array.prototype.slice.call(arguments, f.length);
    
    // ...
}

// to be equivalent of
function func(a, b, ...args) {
    // ...
}
```

注意，rest参数之后不能再有其它参数（即，只能是最后一个参数），否则会报错。

```javascript
function func(a, ...b, c) {
    // ...
}
// Rest parameter must be last formal parameter
```

函数的length属性，不包括rest参数：

```javascript
(function(a) {}).length     // 1
(function(...a) {}).length      // 0
(function(a, b, ...c)).length   // 2
```

### 展开运算符

展开运算符（spread）是三个点（...）,可以将数组转为用逗号分隔的参数序列。如同rest参数的逆运算。

#### 语法

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5);
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>...]
```

用于数组字面量：

```javascript
[...iterableObj, 4, 5, 6]
```

用于函数调用：

```javascript
myFunction(...iterableObj);
```

展开运算符主要用于函数调用，如下：

```javascript
function func(x, y, z, a, b) {
    console.log(x, y, z, a, b);
}

var args = [1, 2];
func(0, ...args, 3, ...[4]);
// 0 1 2 3 4
```

注意：任何实现了Iterator接口的对象，都可以用展开运算符转为真正的数组。

#### 用法

1. 替换apply方法

展开运算符可以展开数组，因此可以替换apply方法，将数组转为函数的参数。

```javascript
function func(x, y, z) { }
var args = [0, 1, 2];

// ES5写法
func.apply(null, args);

// ES6写法
func(...args);
```

2. 更强大的数组字面量操作

如果由一个已知数组创建一个新数组，数组字面量语法则不足以达到目的，必须结合push, splice, concat等方法。而展开运算符可以轻松实现这个目标：

```javascript
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
// ["head", "shoulders", "knees", "and", "toes"]
```

展开运算符可以用于任何数组字面量，并可以多次使用。

3. 适用new

JS的函数只能返回一个值，如果返回多个值就需要用到数组或对象。展开运算符提供了一种处理这种返回值的有效方法 

4. 替换push方法

push方法常用于将一个数组加入到另一个数组的结尾。在ES5中是这样做的：

```javascript
var arr1 = [0, 1, 2], arr2 = [3, 4, 5];
// Append all items in arr2 onto arr1
Array.prototype.push.apply(arr1, arr2);
```

push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了展开运算符，就可以像下面直接将数组传入push方法。

```javascript
var arr1 = [0, 1, 2], arr2 = [3, 4, 5];
arr1.push(...arr2);
arr1 // [0, 1, 2, 3, 4, 5]
```

上面可以将返回的数组使用展开运算直接传入构造函数。

5. 只用于可迭代的变量

下面的用法就会报错：

```javascript
var obj = {key1: 'value1'};
var args = [...obj]; // 报错

function func(x) {
    console.log(x);
}
func(...obj); // 报错
```