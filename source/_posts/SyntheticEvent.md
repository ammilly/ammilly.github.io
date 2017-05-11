---
layout: post
title: 合成事件（SyntheticEvent）
tags: [SyntheticEvent,react,javascript]
date: 2017-05-11 16:40:00
---

> 本文简要介绍React事件系统中的合成事件(`SyntheticEvent`)，`SyntheticEvent`是React对浏览器原生事件跨游览器的封装，和原生事件一样支持`stopPropagation()`、`preventDefault()`接口，并且这些接口是跨游览器兼容的。

<!-- more -->

### 属性
如果需要使用浏览器的原生事件，可以通过`nativeEvent`属性获得。每个`SyntheticEvent`对象都具有以下属性：
```JavaScript
boolean bubbles
boolean cancelable
boolean defaultPrevented
boolean isTrusted
boolean isDefaultPrevented()
boolean isPropagationStopped()

void preventDefault()
void stopPropagation()

string type

number eventPhase
number timeStamp

DOMEvent nativeEvent
DOMEventTarget currentTarget
DOMEventTarget target
```

> ***注意：***   
React v0.14版本，在事件处理程序中返回`false`并不会停止事件冒泡，取而代之，如果需要应手动触发`e.stopPropagation()`或`e.preventDefault()`。

### 事件池 (`Event Pooling`)
`SyntheticEvent`是池化的，就意味着`SyntheticEvent`对象将会被重用，且所有属性都会在事件回调被调用后清空（`nullified`）。这是出于性能考虑，因此，无法异步访问事件。
```JavaScript
function onClick(event) {
    console.log(event); // => nullified object.
    console.log(event.type); // => "click"
    const eventType = event.type; // => "click"

    setTimeout(function() {
        console.log(event.type); // => null
        console.log(eventType); // => "click"
    }, 0);

    // Won't work. this.state.clickEvent will only contain null values.
    this.setState({clickEvent: event});

    // You can still export event properties.
    this.setState({eventType: event.type});
}
```
> ***注意：***   
如果想异步访问事件属性，需要在事件上调用`event.persist()`，这会从池中移除`SyntheticEvent`并允许保留对事件的引用。   

### 支持的事件
React将事件统一化，使事件在不同的浏览器上保持一致的属性。   
以下的事件处理程序在事件冒泡阶段被触发，如果要注册事件捕获程序，在所有的事件名后加上`Capture`即可，例如，使用`onClickCapture`来处理捕获阶段的点击事件。   
* Clipboard Events
* Composition Events
* Keyboard Events
* Focus Events
* Form Events
* Mouse Events
* Selection Events
* Touch Events
* UI Events
* Wheel Events
* Media Events
* Image Events
* Animation Events
* Transition Events

#### Clipboard Events
Event names:
```JavaScript
onCopy onCut onPaste
```

Properties:
```JavaScript
DOMDataTransfer clipboardData
```

#### Composition Events
Event names:
```JavaScript
onCompositionEnd onCompositionStart onCompositionUpdate
```

Properties:
```JavaScript
string data
```
#### Keyboard Events
Event names:
```JavaScript
onKeyDown onKeyPress onKeyUp
```

Properties:
```JavaScript
boolean altKey
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean repeat
boolean shiftKey

number charCode
number keyCode
number location
number which

string key
string locale
```
#### Focus Events
Event names:
```JavaScript
onFocus onBlur
```
These focus events work on all elements in the React DOM, not just form elements.  

Properties:
```JavaScript
DOMEventTarget relatedTarget
```
#### Form Events
Event names:
```JavaScript
onChange onInput onSubmit
```

Properties:
```JavaScript
DOMEventTarget relatedTarget
```
#### Mouse Events
Event names:
```JavaScript
onClick onContextMenu onDoubleClick onDrage onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp
```
The `onMouseEnter` and `onMouseLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.   

Properties:
```JavaScript
boolean altKey
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey

number button
number buttons
number clientX
number clientY
number pageX
number pageY
number screenX
number screenY

DOMEventTarget relatedTarget
```
#### Selection Events
Event names:
```JavaScript
onSelect
```

Properties:
```JavaScript
DOMEventTarget relatedTarget
```
#### Touch Events
Event names:
```JavaScript
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Properties:
```JavaScript
boolean altKey
boolean getModifierState(key)
boolean ctrlKey
boolean metaKey
boolean shiftKey

DOMTouchList targetTouches
DOMTouchList touches
```
#### UI Events
Event names:
```JavaScript
onScroll
```

Properties:
```JavaScript
number detail
DOMAbstractView view
```
#### Wheel Events
Event names:
```JavaScript
onWheel
```

Properties:
```JavaScript
number deltaMode
number deltaX
number deltaY
number deltaZ
```
#### Media Events
Event names:
```JavaScript
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting
```
#### Image Events
Event names:
```JavaScript
onLoad onError
```
#### Animation Events
Event names:
```JavaScript
onAnimationStart onAnimationEnt onAnimationIteration
```

Properties:
```JavaScript
string animationName
string pseudoElement
float elapsedTime
```
#### Transition Events
Event names:
```JavaScript
onTransitionEnd
```

Properties:
```JavaScript
string propertyName
string pseudoElement
float elapsedTime
```
