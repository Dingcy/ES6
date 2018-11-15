// 1.场景  下面一种获取用户id的请求处理
function getUserId(){
    return new Promise(function (resolve,reject) {
        // 异步请求
        http.get(url,function name(result) {
            resolve(result.userId)
        })
    })
}

getUserId().then(function (id) {
    // some code 
})


// 2.原理剖析
function Promise(fn) {
    var value = null,
        callbacks = [];  //callbacks为数组，因为可能同时有很多个回调

    this.then = function (onFulfilled) {
        callbacks.push(onFulfilled);
    };

    function resolve(value) {
        callbacks.forEach(function (callback) {
            callback(value);
        });
    }

    fn(resolve);
}
// 上述代码很简单，大致的逻辑是这样的：
// 1.调用then方法，将想要在Promise异步操作成功时执行的回调放入callbacks队列，
// 其实也就是注册回调函数，可以向观察者模式方向思考；
// 2.创建Promise实例时传入的函数会被赋予一个函数类型的参数，
// 即resolve，它接收一个参数value，代表异步操作返回的结果，当一步操作执行成功后，
// 用户会调用resolve方法，这时候其实真正执行的操作是将callbacks队列中的回调一一执行；