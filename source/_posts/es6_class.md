---
layout: post
title: ES6 Class
tags: [es6,es2015,class]
date: 2016-07-28 20:10:00 +800
---

> 从ES6（ES2015）开始，JS提出了类（Class）概念，JS中的类只是JS现有的、基于原型的继承的一种语法包装（语法糖），它能让我们用理简明的语法实现继承。

<!--more-->

## 定义类

ES6中的类实际就是一个函数，且正如函数的定义方式有函数声明和函数表达式两种方式一样，类的定义也有两种方式，分别为：

- 类声明
- 类表达式

### 类声明

类声明是定义类的一种方式，使用class关键字后跟一个类名，就可以定义一个类。如下：

```javascript
class Foo {
    constructor() {
        // ..
    }
}
```

#### 不存在变量提升（hoist）

类声明和函数声明不同的一点是，函数声明存在变量提升现象，而类声明不会。即，类必须先声明，然后才能使用，否则会抛出`ReferenceError`异常。

```javascript
var foo = new Foo(); // Uncaught ReferenceError: Foo is not defined(...)
class Foo {
    // ...
}
```

这种规定的原因与类的继承有关，必须保证子类在父类之后定义。

```javascript
let Foo = class {};

class Bar extends Foo {
}
```

上面的代码不会报错，因为class `Bar`继承`Foo`时，`Foo`已经有定义了。但是，如果存在Class提升，上面代码就会报错，因为Class `Bar`会被提升到代码头部，而表达式式`Foo`是不会提升的，所以导致Class `Bar`继承`Foo`的时候，`Foo`还没有定义。

### 类表达式

类表达式就定义类的另外一种方式，就像函数表达式一样，在类表达式中，类名是可有可无的。若定义的类名，则该类名只有的类的内部才可以访问到。

```javascript
// 方式一
const MyClass = class {};

// 方式二：给出类名
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
```

上面方式二定义类的同时给出了类名，此时，`Me`类名只可以在Class的内部代码可用，指代当前类。MyClass的name属性值为给出的类名。

```javascript
let my = new MyClass();
my.getClassName(); // Me
Me.name; // Uncaught ReferenceError: Me is not defined(…)
MyClass.name; // Me
```

采用类表达式，可以写出立即执行的Class。如下：

```javascript
let person = new class {
    constructor(name) {
        this.name = name;
    }
    
    sayName() {
        console.log(this.name);
    }
}('Zhang San');

person.sayName(); // Zhang San
```

## 类体和方法定义

类的成员需要定义在一对大括号内`{}`，大括号内的代码的大括号本身组成了类体。类成员包括类构造器和类方法（包括静态方法和实例方法）。

### 严格模式

类体中的代码都强制在严格模式中执行，即默认"use strict"。考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

### 构造器（constructor方法）

`constructor`方法是一个特殊的类方法，它既不是静态方法也不是实例方法，它仅在实例化的时候被调用。一个类只能拥有一个名为`constructor`的方法，否则会抛出`SyntaxError`异常。

如果没有定义`constructor`方法，这个方法会被默认添加，即，不管有没有显示定义，任何一个类都有`constructor`方法。

子类必须在constructor方法中调用`super`方法，否则新建实例时会报错。因为子类没有自己的`this`对象，而是继承父类的`this`对象，然后对其进行加工，如果不调用`super`方法，子类就得不到`this`对象。

```javascript
class Point {}

class ColorPoint extends Point {
    constructor() {}
}

let cp = new ColorPoint(); // ReferenceError
```

上面代码中，`ColorPoint`继承了父类`Point`，但是它的构造函数没有调用`super`方法，导致新建实例时报错。


### 原型方法

定义类的方法时，方法名前面不需要加上`function`关键字。另外，方法之间不需要用逗号分隔，加了会报错。

```javascript
class Bar {
    constructor() {}
    
    doStuff() {}
    
    toString() {}
    
    toValue() {}
}
```

类的所有方法都是定义在类的`prototype`属性上的，上面的写法等同于下面：

```javascript
Bar.prototype = {
    doStuff() {},
    toString() {},
    toValue() {}
};
```

所以，在类的实例上调用方法，实际上就是调用原型上的方法。   

```javascript
class B {}
let b = new B();

b.constructor === B.prototype.constructor; // true
```

上面代码中，`b`是B类的实例，它的`constructor`方法就是B类原型的`constructor`方法。   
由于类的方法都是定义在`prototype`上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

```javascript
class Point {
    constructor() {
        // ...
    }
}

Object.assign(Point.prototype, {
    toString() {},
    toValue() {}
});
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```javascript
class Point {
    constructor(x, y) {
        // ...
    }
    
    toString() {
        return '(' + x + ', ' + y + ')';
    }
}

Object.keys(Point.prototype); // []
Object.getOwnPropertyNames(Point.prototype); // ["constructor", "toString"]
Object.getOwnPropertyDescriptor(Point, 'toString');
// Object {writable: true, enumerable: false, configurable: true}
```

### 静态方法

`static`关键字用来定义类的静态方法。静态方法是指那些不需要对类进行实例化，使用类名就可以直接访问的方法。静态方法经常用来作为工具函数。

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

静态方法不可以被实例继承，是通过类名直接调用的。但是，父类的静态方法可以被子类继承。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod(); // "hello"
```

静态方法也可以用`super`关键字调用。

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod(); // "hello too"
```

## extends关键字

`extends`关键字用于实现类之间的继承。子类继承父类，就继承了父类的所有属性和方法。   
`extends`后面只可以跟一个父类。

## super 关键字

`super`关键字可以用来调用其父类的构造器或方法。

```javascript
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```

## 类的Getter和Setter方法

与ES5一样，在类内部可以使用`get`和`set`关键字，对某个属性设置取值和赋值方法。

```javascript
class Foo {
    constructor() {}
    
    get prop() {
        return 'getter';
    }
    
    set prop(val) {
        console.log('setter: ' + val);
    }
}

let foo = new Foo();

foo.prop = 1;
// setter: 1

foo.prop;
// "getter"
```

上面代码中，`prop`属性有对应 的赋值和取值方法，因此赋值和读取行为都被自定义了。   
存值和取值方法是设置在属性的descriptor对象上的。

```javascript
var descriptor = Object.getOwnPropertyDescriptor(Foo.prototype, 'prop');

"get" in descriptor // true
"set" in descriptor // true
```

上面代码中，存值和取值方法是定义在`prop`属性的描述对象上的，这与ES5一致。


## 类的Generator方法

如果类的某个方法名前加上星号（`*`），就表示这个方法是一个Generator函数。

```javascript
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个Generator函数。Symbol.iterator方法返回一个Foo类的默认遍历器，`for...of`循环会自动调用这个遍历器。

