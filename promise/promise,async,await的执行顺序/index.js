async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
  }
  async function async2(){
    console.log('async2')
  }
  console.log('script start')
  setTimeout(function(){
    console.log('setTimeout') 
  },0)  
  async1();
  new Promise(function(resolve){
    console.log('promise1')
    resolve();
  }).then(function(){
    console.log('promise2')
  })
  console.log('script end')

// 分析
// Promise优先于setTimeout宏任务。所以，setTimeout回调会在最后执行。
// Promise一旦被定义，就会立即执行。
// Promise的reject和resolve是异步执行的回调。所以，resolve()会被放到回调队列中，在主函数执行完和setTimeout前调用。
// await执行完后，会让出线程。async标记的函数会返回一个Promise对象



  //script start
  //async1 start
  //async2
  //promise1
  //script end
  //async1 end
  //promise2
  //settimeout



//   async function testAsync() {
//     console.log("hello async");
// }
// let result = testAsync();
// console.log(result)

  