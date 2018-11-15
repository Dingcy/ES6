// var colors = ["red", "green", "blue"];

// for (var i = 0, len = colors.length; i < len; i++) {
//     console.log(colors[i]);
// }

// 去重
// function unique(array) {
//     var res = [];
//     for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
//         for (var j = 0, resLen = res.length; j < resLen; j++) {
//             if (array[i] === res[j]) {
//                 break;
//             }
//         }
//         if (j === resLen) {
//             res.push(array[i]);
//         }
//     }
//     return res;
// }


function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= items.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}

// iterator 就是一个迭代器对象
// var iterator = createIterator([1, 2, 3]);

// console.log(iterator.next()); // { done: false, value: 1 }
// console.log(iterator.next()); // { done: false, value: 2 }
// console.log(iterator.next()); // { done: false, value: 3 }
// console.log(iterator.next()); // { done: true, value: undefined }



// 没有手动添加 Symbol.iterator 属性
// const colors = ["red", "green", "blue"];

// for (let color of colors) {
//     console.log(color);
// }


// 手动修改这个属性
// var colors = ["red", "green", "blue"];
// colors[Symbol.iterator] = function() {
//     return createIterator([1, 2, 3]);
// };

// for (let color of colors) {
//     console.log(color);
// }


var colors = ["red", "green", "blue"];

for (let index of colors.keys()) {
    console.log(index);
}

// 0
// 1
// 2

for (let color of colors.values()) {
    console.log(color);
}

// red
// green
// blue

for (let item of colors.entries()) {
    console.log(item);
}

// [ 0, "red" ]
// [ 1, "green" ]
// [ 2, "blue" ]





