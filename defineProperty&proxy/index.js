var obj = {};
Object.defineProperty(obj,'test',{
    value:1,
    configurable:true,
    writable:true,
    enumerable:true
});


var obj1 = {},value = null;
Object.defineProperty(obj1,'num',{
    get :function() {
        console.log('执行了 get 操作');
        return value;
    },
    set:function(newValue){
        console.log('执行了 set 操作');
        value = newValue;
    }
});
obj1.num = 1;//执行了 set 操作
console.log(obj1.num);//执行了 get 操作   1


// 用proxy实现
// ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。我们来看看它的语法：
// var proxy = new Proxy(target,handler)
// proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。
// 其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，
// handler参数也是一个对象，用来定制拦截行为。

var proxy = new Proxy({},{
    get:function (obj,prop) {
        console.log('设置 get 操作');
        return obj[prop]
    },
    set:function (obj,prop,value) {
        console.log('设置 set 操作');
        obj[prop] = value;
    }
});

proxy.test = 12;
console.log(proxy.test);

// 除了 get 和 set 之外，proxy 可以拦截多达 13 种操作，比如 has(target, propKey)，可以拦截 propKey in proxy 的操作，返回一个布尔值。

var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

console.log(p());// "I am the proxy"


// 下面的例子是拦截第一个字符为下划线的属性名，不让它被 for of 遍历到。

let target2 = {
    _bar: 'foo',
    _prop: 'bar',
    prop: 'baz'
  };
  
  let handler2 = {
    ownKeys (target) {
      return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    //   Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是Symbol或字符串，也不管是否可枚举。
    }
  };
  
  let proxy2 = new Proxy(target2, handler2);
  for (let key of Object.keys(proxy2)) {
    console.log(target2[key]);
  }
  // "baz"
  
