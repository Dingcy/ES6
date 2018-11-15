// 使用 generator
// var fetch = require('node-fetch');
// var co = require('co');

// function* gen() {
//     var r1 = yield fetch('https://api.github.com/users/github');
//     var json1 = yield r1.json();
//     console.log(json1.bio);
// }

// co(gen);


// 使用 async
// var fetch = require('node-fetch');

// var fetchData = async function () {
//     var r1 = await fetch('https://api.github.com/users/github');
//     var json1 = await r1.json();
//     console.log(json1.bio);
// };

// fetchData();

// 给定一个 URL 数组，如何实现接口的继发和并发？
// 1.async继发实现
// 继发一
async function getData() {
    var res1 = await fetch(url1);
    var res2 = await fetch(url2);
    var res3 = await fetch(url3);
    return 'all done';
}
// 继发2
async function getData2(urls) {
    for (const url in urls) {
      const response  = await fetch(url);
      console.log(await response.text());
    }
}


// 并发实现1
async function getData() {
    var res = await Promise.all([fetch(url1),fetch(url2),fetch(url3)])
    return 'all done';
}
// 并发实现2
async function getData() {
    //并发读取url
    const textPromises  = urls.map(async item => {
        const response  = await fetch(item);
        return response.text();
    });

    for(const textPromise of textPromises) {
      console.log(await textPromise);
    }
    
}



  