define(function() {
    console.log('multiply模块加载了');
    var multiply = function (x,y) {
        return x*y;
    }

    return {
        multiply:multiply
    }
    
});