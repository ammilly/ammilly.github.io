---
layout: post
title: Express
tags: [express,js,framework]
date: 2016-07-29 15:10:00 +800
---

> Fast, unopinionated, minimalist web framework for Node.js.

<!--more-->

## What is Express?

> Express is a minimal and flexible Node.js web application framework.   
It provides a robust set of features for web and mobile applications.


## Why choose it?

#### APIs

> A myriad of HTTP utility methods and middleware
Quick and easy to create a robust API

#### Performance

> Provides a thin layer of fundamental web application features

#### Frameworks

> Many popular frameworks are based on Express: 
Feathers, KeystoneJS, LoopBack, MEA, Sails…


## How to use it?

- Install Node.js
- Create project & Install express

```bash
$ npm install express –save
```

- Run

Create index.js, add the following code:

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

```bash
$ node index.js
```

Run the above command to start your app.

### Reference

[Express](http://expressjs.com/)
