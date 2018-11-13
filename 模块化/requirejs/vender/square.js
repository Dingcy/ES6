// square.js
define(['./multiply'], function(multiplyModule) {
    console.log('加载了square 模块')
    return {
        square: function(num) {
            
            return multiplyModule.multiply(num, num)
        }
    };
});
