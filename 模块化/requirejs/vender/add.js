define(function() {
    console.log('add模块加载了');
    var add = function (x,y) {
        return x+y;
    }

    return {
        add:add
    }
    
});