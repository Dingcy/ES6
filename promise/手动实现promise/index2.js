// function fn(num) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {     //耗时操作在promise构造函数中，即同步执行
//             resolve(num);
//         }, 1000)
//     })
// }

// fn(1).then(data => {      //在resolve或者reject之后  then方法注册的才能被调用
//         console.log(data);  //1
//     }
// );

// 简版
function Promise(fn) {
    function resolve(value) {
        
    }
    function reject(value) {
        
    }
    fn(resolve,reject)
}

// 加入回调
function Promise(fn) {
    var value = null,succallbacks = [],failallbacks = [];
    this.then = function (fulfilled,rejected) {
        succallbacks.push(fulfilled);
        failallbacks.push(rejected);
    }
    function resolve(value) {
        succallbacks.forEach((callback) => {
            callback(value)
        })
    }
    function reject(value) {
        failcallbacks.forEach((callback) => {
            callback(value);
        })
    }
    fn(resolve,reject)
}

// 链式调用
function Promise(fn) {
    var value = null,succallbacks = [],failallbacks = [];
    this.then = function (fulfilled,rejected) {
        succallbacks.push(fulfilled);
        failallbacks.push(rejected);
        return this;
    }
    function resolve(value) {
        setTimeout(() => {
            succallbacks.forEach((callback) => {
                callback(value)
            })
        }, 0);
    }
    function reject(value) {
        setTimeout(() => {
            failcallbacks.forEach((callback) => {
                callback(value);
            })
        }, 0);
    }
    fn(resolve,reject)
}

// 加入状态
function Promise(fn) {
    var value = undefined,reason =  undefined, succallbacks = [],failallbacks = [];
    var status = 'pending';
    this.then = function (fulfilled,rejected) {
        if(status === 'pending'){
            succallbacks.push(fulfilled);
            failallbacks.push(rejected);
            return this;
        }else if(status === 'fulfilled'){
            fulfilled(data)
        }else {
            rejected(reason);
        }
       
    }
    function resolve(value) {
        setTimeout(() => {
            status = 'fulfilled';
            data = value;
            succallbacks.forEach((callback) => {
                callback(value)
            })
        }, 0);
    }
    function reject(value) {
        setTimeout(() => {
            status = 'rejected';
            reason = value;
            failcallbacks.forEach((callback) => {
                callback(value);
            })
        }, 0);
    }
    fn(resolve,reject)
}




// 返回新的promise
function Promise(fn) {
    var value = undefined,reason =  undefined, succallbacks = [],failallbacks = [];
    var status = 'pending';
    this.then = function (fulfilled, rejected) {
        return new Promise(function(resolve,reject) {    //返回一个新的promise
            function suc(value) {   //成功
                var ret = typeof fulfilled === 'function' && fulfilled(value) || value;
                if( ret && typeof ret ['then'] == 'function'){    //判断 then中的 返回的是否是promise对象，如果是注册then方法
                    ret.then(function(value){
                        resolve(value);
                    });
                } else {
                    resolve(ret);
                }
            }
            function errback(reason) {  //失败
                reason = typeof rejected === 'function'  && rejected(reason) || reason;
                reject(reason);
            }

            if (status === 'pending') {
                succallbacks.push(suc);
                failcallbacks.push(errback);
            } else if(status === 'fulfilled'){
                suc(data);
            } else {
                errback(reason);
            }
        })

    }
    function resolve(value) {
        setTimeout(() => {
            status = 'fulfilled';
            data = value;
            succallbacks.forEach((callback) => {
                callback(value)
            })
        }, 0);
    }
    function reject(value) {
        setTimeout(() => {
            status = 'rejected';
            reason = value;
            failcallbacks.forEach((callback) => {
                callback(value);
            })
        }, 0);
    }
    fn(resolve,reject)
}


function fn(num) {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
            resolve(num); //1   去掉time 则不会执行
        // }, 1000)
    })
}

fn(1).then(data => {
        console.log(data);
    }).then(data => {
    console.log(data);
});





