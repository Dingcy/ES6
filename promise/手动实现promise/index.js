// 1.一般回调
// function dosomething(callback) {
//     console.log('do something');
//     callback();
// }

// dosomething(function(){
//     console.log('a');
// })


//2、但是在使用promise时，我们是用then方法去取结果，而promise就是个对象，那么上面的代码看起来应该这样写：
// function dosomething(callback) {
//     console.log('do something');
//     return {
//         then:function (callback) {
//             var value = 1;
//             callback(value);
//         }
//     }
// }

// dosomething().then(function (res) {
//     console.log(res)
// })


// 3、在ES6中Promise是一个构造函数，这简单，给这个dosomething换个名字，
// function Promise() {
//     this.then = function (callback) {
//         var value = 1;
//         callback(value);
//     }
// }

// 在实例化promise的时候，要传一个函数进去，这也简单
// function Promise(fn) {
//     this.then = function (callback) {
//         callback();
//     }
// }

// 在then方法的回调函数中我们希望得到promise的值，这个值是在fn函数调用后被resolve函数运算后得到的，最终要在onResolved函数中拿到，
// 也就是说，我们必须在resolve中将这个值传递给onResolved，迂回一下：

// function Promise(fn) {
//    function resolve(value) {
//         callback(value)
//    } ;
//    this.then = function (onResolved) {
//        callback = onResolved;
//    }
//    fn(resolve);
// }


// 但是这里有一个问题，就是我们调用resolve方法时，还没有调用过then方法，因此callbak是null，浏览器报错：callback is not a function，
// 这里hack下，让resolve方法的执行在then之后。

// function Promise(fn) {
//     function resolve(value) {
//         setTimeout(() => {
//             callback(value) 
//         }, 0);
//     }
//     this.then = function (onResolved) {
//         callback = onResolved;
//     }
//     fn(resolve);
//  }

//  执行
// var promise = new Promise(function (res) {
//     var value = 2;
//     res(value);
// })

// promise.then(function (res) {
//     console.log(res);
// })


// promise是有状态的，而且状态不可逆，同样的为了简单起见，先来搞定从pending变到resolved，那么rejected也一样。
// 仔细想下，执行了resolve方法后可以得到一个resolved状态的值，那么必然在resolve方法中会去改变promise的状态，
// 并且得到这个值，那么代码貌似应该这样写：

function Promise(fn) {
    var state = 'pending';
    function resolve(value) {
        callback(value);
        state = 'resolved'; 
    }
    this.then = function (onResolved) {
        callback = onResolved;
    }
    fn(resolve);
 }

//  这里我们先把setTimeout这家伙给干掉了，因为我们加入了状态，也就意味我们是想通过状态的变化来知道能不能得到值，
//  那么问题来了，我们不知道状态啥时候变，而我们现在要做的就是创造这么个机会
 function Promise(fn) {
    var state = 'pending';
    var value;
    var deferred;
    function resolve(newValue) {
        value = newValue;
        state = 'resolved'; 
        if(deferred){
            handle(deferred);
        }
    }
    function handle(onResolved) {
        if(state === 'pending'){
            deferred = onResolved;
            return ;
        }
        onResolved(value);
    }
    this.then = function (onResolved) {
        callback = onResolved;
    }
    fn(resolve);
 }


// 解决链式调用，在then方法中返回一个promise
function Promise(fn) {
    var state = 'pending';
    var value;
    var deferred;
    function resolve(newValue) {
        value = newValue;
        state = 'resolved'; 
        if(deferred){
            handle(deferred);
        }
    }
    function handle(onResolved) {
        if(state === 'pending'){
            deferred = handler;
            return ;
        }
        if(!handler.onResolved){
           handler.resolve(value);
            return ;
        }
        var ret = handler.onResolved(value);
        handler.resolve(ret);
    }
    this.then = function (onResolved) {
        return new Promise(function (resolved) {
            handle({
                onResolved,
                resolve
            })
        })
    }
    fn(resolve);
 }

