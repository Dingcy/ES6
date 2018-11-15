// let set = new Set([1, 2, 3, 4, 4]);
// console.log(set); // Set(4) {1, 2, 3, 4}

// set = new Set(document.querySelectorAll('div'));
// console.log(set.size); // 66

// set = new Set(new Set([1, 2, 3, 4]));
// console.log(set.size); // 4



// let set = new Set();
// console.log(set.add(1).add(2)); // Set [ 1, 2 ]

// console.log(set.delete(2)); // true
// console.log(set.has(2)); // false

// console.log(set.clear()); // undefined
// console.log(set.has(1)); // false

// let set = new Set(['a', 'b', 'c']);
// console.log(set.keys()); // SetIterator {"a", "b", "c"}
// console.log(set.entries()); // SetIterator {"a", "b", "c"}
// console.log([...set.keys()]); // ["a", "b", "c"]
// console.log([...set.entries()]); // [["a", "a"], ["b", "b"], ["c", "c"]]



//模拟实现set结构
(function(global) {

    var NaNSymbol = Symbol('NaN');

    var encodeVal = function(value) {
        return value !== value ? NaNSymbol : value;
    }

    var decodeVal = function(value) {
        return (value === NaNSymbol) ? NaN : value;
    }

    function Set(data) {
        this._values = [];
        this.size = 0;

        data && data.forEach(function(item) {
            this.add(item);
        }, this);

    }

    Set.prototype['add'] = function(value) {
        value = encodeVal(value);
        if (this._values.indexOf(value) == -1) {
            this._values.push(value);
            ++this.size;
        }
        return this;
    }

    Set.prototype['has'] = function(value) {
        return (this._values.indexOf(encodeVal(value)) !== -1);
    }

    Set.prototype['delete'] = function(value) {
        var idx = this._values.indexOf(encodeVal(value));
        if (idx == -1) return false;
        this._values.splice(idx, 1);
        --this.size;
        return true;
    }

    Set.prototype['clear'] = function(value) {
        this._values = [];
        this.size = 0;
    }

    Set.prototype['forEach'] = function(callbackFn, thisArg) {
        thisArg = thisArg || global;
        for (var index = 0; index < this._values.length; index++) {
            callbackFn.call(thisArg,this._values[i],this._values[i],this);   
        }
    }

    Set.length = 0;

    global.Set = Set;

})(this);

let set = new Set([1, 2, 3, 4, 4]);
console.log(set);// Set { 1, 2, 3, 4 }
console.log(set.size); // 4
