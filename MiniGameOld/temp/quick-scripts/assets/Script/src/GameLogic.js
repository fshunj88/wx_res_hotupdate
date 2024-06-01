(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/src/GameLogic.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a87360wp7lAKrqgHEx1sURR', 'GameLogic', __filename);
// Script/src/GameLogic.js

"use strict";

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Core;
(function (Core) {
    var DeviceUtils = function () {
        function DeviceUtils() {}
        DeviceUtils.isHtml5 = function () {
            return cc.sys.isBrowser;
        };
        DeviceUtils.isNative = function () {
            return cc.sys.isNative;
        };
        DeviceUtils.isMiniGame = function () {
            return cc.sys.platform == cc.sys.WECHAT_GAME;
        };
        DeviceUtils.isWXGame = function () {
            return cc.sys.platform == cc.sys.WECHAT_GAME && !DeviceUtils.isQQPlay() && !DeviceUtils.isTTGame();
        };
        DeviceUtils.isQQPlay = function () {
            return false;
        };
        DeviceUtils.isTTGame = function () {
            return false;
        };
        DeviceUtils.isMobile = function () {
            return cc.sys.isMobile;
        };
        DeviceUtils.isPC = function () {
            return !cc.sys.isMobile;
        };
        DeviceUtils.isAndroid = function () {
            return cc.sys.os == cc.sys.OS_ANDROID;
        };
        DeviceUtils.isiOS = function () {
            return cc.sys.os == cc.sys.OS_IOS;
        };
        DeviceUtils.isOSX = function () {
            return cc.sys.os == cc.sys.OS_OSX;
        };
        return DeviceUtils;
    }();
    Core.DeviceUtils = DeviceUtils;
})(Core || (Core = {}));
var Collection;
(function (Collection) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    Collection.has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        } else if (a === b) {
            return 0;
        } else {
            return 1;
        }
    }
    Collection.defaultCompare = defaultCompare;
    function defaultEquals(a, b) {
        return a === b;
    }
    Collection.defaultEquals = defaultEquals;
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (isString(item)) {
            return '$s' + item;
        } else {
            return '$o' + item.toString();
        }
    }
    Collection.defaultToString = defaultToString;
    function makeString(item, join) {
        if (join === void 0) {
            join = ',';
        }
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (item instanceof String || item instanceof Number) {
            return item.toString();
        } else {
            var toret = '{';
            var first = true;
            for (var prop in item) {
                if (Collection.has(item, prop)) {
                    if (first) {
                        first = false;
                    } else {
                        toret = toret + join;
                    }
                    toret = toret + prop + ':' + item[prop];
                }
            }
            return toret + '}';
        }
    }
    Collection.makeString = makeString;
    function isFunction(func) {
        return typeof func === 'function';
    }
    Collection.isFunction = isFunction;
    function isUndefined(obj) {
        return typeof obj === 'undefined';
    }
    Collection.isUndefined = isUndefined;
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    Collection.isString = isString;
    function reverseCompareFunction(compareFunction) {
        if (isUndefined(compareFunction) || !isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                } else if (a === b) {
                    return 0;
                } else {
                    return -1;
                }
            };
        } else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    Collection.reverseCompareFunction = reverseCompareFunction;
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    Collection.compareToEquals = compareToEquals;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    function indexOf(array, item, equalsFunction) {
        var equals = equalsFunction || Collection.defaultEquals;
        var length = array.length;
        var i = 0;
        for (; i < length; i++) {
            if (equals(array[i], item)) {
                return i;
            }
        }
        return -1;
    }
    Collection.indexOf = indexOf;
    function lastIndexOf(array, item, equalsFunction) {
        var equals = equalsFunction || Collection.defaultEquals;
        var length = array.length;
        var i = length - 1;
        for (; i >= 0; i--) {
            if (equals(array[i], item)) {
                return i;
            }
        }
        return -1;
    }
    Collection.lastIndexOf = lastIndexOf;
    function contains(array, item, equalsFunction) {
        return indexOf(array, item, equalsFunction) >= 0;
    }
    Collection.contains = contains;
    function remove(array, item, equalsFunction) {
        var index = indexOf(array, item, equalsFunction);
        if (index < 0) {
            return false;
        }
        array.splice(index, 1);
        return true;
    }
    Collection.remove = remove;
    function frequency(array, item, equalsFunction) {
        var equals = equalsFunction || Collection.defaultEquals;
        var length = array.length;
        var freq = 0;
        var i = 0;
        for (; i < length; i++) {
            if (equals(array[i], item)) {
                freq++;
            }
        }
        return freq;
    }
    Collection.frequency = frequency;
    function equals(array1, array2, equalsFunction) {
        var equals = equalsFunction || Collection.defaultEquals;
        if (array1.length !== array2.length) {
            return false;
        }
        var length = array1.length;
        var i = 0;
        for (; i < length; i++) {
            if (!equals(array1[i], array2[i])) {
                return false;
            }
        }
        return true;
    }
    Collection.equals = equals;
    function copy(array) {
        return array.concat();
    }
    Collection.copy = copy;
    function swap(array, i, j) {
        if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
            return false;
        }
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return true;
    }
    Collection.swap = swap;
    function toString(array) {
        return '[' + array.toString() + ']';
    }
    Collection.toString = toString;
    function forEach(array, callback) {
        var ele = undefined;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            ele = array_1[_i];
            if (callback(ele) === false) {
                return;
            }
        }
    }
    Collection.forEach = forEach;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    function defaultDictionaryToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (Collection.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (Collection.isString(item)) {
            return '$s' + item;
        } else {
            return '$o' + item.toString();
        }
    }
    Collection.defaultDictionaryToString = defaultDictionaryToString;
    var Dictionary = function () {
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || defaultDictionaryToString;
        }
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (Collection.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        Dictionary.prototype.setValue = function (key, value) {
            if (Collection.isUndefined(key) || Collection.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (Collection.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!Collection.isUndefined(previousElement)) {
                this.table[k] = undefined;
                this.nElements--;
                delete this.table[k];
                return previousElement.value;
            }
            return undefined;
        };
        Dictionary.prototype.keys = function () {
            var array = [];
            var name = undefined;
            for (name in this.table) {
                if (Collection.has(this.table, name)) {
                    var pair = this.table[name];
                    if (pair !== undefined) {
                        array.push(pair.key);
                    }
                }
            }
            return array;
        };
        Dictionary.prototype.values = function () {
            var array = [];
            var name = undefined;
            for (name in this.table) {
                if (Collection.has(this.table, name)) {
                    var pair = this.table[name];
                    if (pair !== undefined) {
                        array.push(pair.value);
                    }
                }
            }
            return array;
        };
        Dictionary.prototype.forEach = function (callback) {
            var name = undefined;
            for (name in this.table) {
                if (Collection.has(this.table, name)) {
                    if (this.table[name] == undefined) {
                        continue;
                    }
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        Dictionary.prototype.containsKey = function (key) {
            return !Collection.isUndefined(this.getValue(key));
        };
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = '{';
            this.forEach(function (k, v) {
                toret += "\n\t" + k + " : " + v;
            });
            return toret + '\n}';
        };
        return Dictionary;
    }();
    Collection.Dictionary = Dictionary;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    var LinkedDictionaryPair = function () {
        function LinkedDictionaryPair(key, value) {
            this.key = key;
            this.value = value;
        }
        LinkedDictionaryPair.prototype.unlink = function () {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        };
        return LinkedDictionaryPair;
    }();
    var HeadOrTailLinkedDictionaryPair = function () {
        function HeadOrTailLinkedDictionaryPair() {
            this.key = null;
            this.value = null;
        }
        HeadOrTailLinkedDictionaryPair.prototype.unlink = function () {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        };
        return HeadOrTailLinkedDictionaryPair;
    }();
    function isHeadOrTailLinkedDictionaryPair(p) {
        return p.next === null;
    }
    var LinkedDictionary = function (_super) {
        __extends(LinkedDictionary, _super);
        function LinkedDictionary(toStrFunction) {
            var _this = _super.call(this, toStrFunction) || this;
            _this.head = new HeadOrTailLinkedDictionaryPair();
            _this.tail = new HeadOrTailLinkedDictionaryPair();
            _this.head.next = _this.tail;
            _this.tail.prev = _this.head;
            return _this;
        }
        LinkedDictionary.prototype.appendToTail = function (entry) {
            var lastNode = this.tail.prev;
            lastNode.next = entry;
            entry.prev = lastNode;
            entry.next = this.tail;
            this.tail.prev = entry;
        };
        LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
            if (Collection.isUndefined(key)) {
                return undefined;
            }
            var k = '$' + this.toStr(key);
            var pair = this.table[k];
            return pair;
        };
        LinkedDictionary.prototype.getValue = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!Collection.isUndefined(pair)) {
                return pair.value;
            }
            return undefined;
        };
        LinkedDictionary.prototype.remove = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!Collection.isUndefined(pair)) {
                _super.prototype.remove.call(this, key);
                pair.unlink();
                return pair.value;
            }
            return undefined;
        };
        LinkedDictionary.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        };
        LinkedDictionary.prototype.replace = function (oldPair, newPair) {
            var k = '$' + this.toStr(newPair.key);
            newPair.next = oldPair.next;
            newPair.prev = oldPair.prev;
            this.remove(oldPair.key);
            newPair.prev.next = newPair;
            newPair.next.prev = newPair;
            this.table[k] = newPair;
            ++this.nElements;
        };
        LinkedDictionary.prototype.setValue = function (key, value) {
            if (Collection.isUndefined(key) || Collection.isUndefined(value)) {
                return undefined;
            }
            var existingPair = this.getLinkedDictionaryPair(key);
            var newPair = new LinkedDictionaryPair(key, value);
            var k = '$' + this.toStr(key);
            if (!Collection.isUndefined(existingPair)) {
                this.replace(existingPair, newPair);
                return existingPair.value;
            } else {
                this.appendToTail(newPair);
                this.table[k] = newPair;
                ++this.nElements;
                return undefined;
            }
        };
        LinkedDictionary.prototype.keys = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(key);
            });
            return array;
        };
        LinkedDictionary.prototype.values = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(value);
            });
            return array;
        };
        LinkedDictionary.prototype.forEach = function (callback) {
            var crawlNode = this.head.next;
            while (!isHeadOrTailLinkedDictionaryPair(crawlNode)) {
                var ret = callback(crawlNode.key, crawlNode.value);
                if (ret === false) {
                    return;
                }
                crawlNode = crawlNode.next;
            }
        };
        return LinkedDictionary;
    }(Collection.Dictionary);
    Collection.LinkedDictionary = LinkedDictionary;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    var Entry = function () {
        function Entry() {
            this.prev = null;
            this.next = null;
            this.obj = null;
        }
        return Entry;
    }();
    var List = function () {
        function List(toStringFunc) {
            this._head = new Entry();
            this._head.prev = this._head;
            this._head.next = this._head;
            this._objMap = new Collection.Dictionary(toStringFunc);
        }
        List.prototype._insert = function (obj, prev, next) {
            if (this._objMap.containsKey(obj)) {
                if (obj == prev.obj || obj == next.obj) {
                    return;
                }
                var oldElem = this._objMap.getValue(obj);
                this._remove(oldElem);
            }
            var elem = new Entry();
            elem.obj = obj;
            this._objMap.setValue(obj, elem);
            elem.prev = prev;
            elem.next = next;
            next.prev = elem;
            prev.next = elem;
        };
        List.prototype._remove = function (elem) {
            elem.next.prev = elem.prev;
            elem.prev.next = elem.next;
            this._objMap.remove(elem.obj);
        };
        List.prototype.push = function (obj, after) {
            var entry = null;
            if (after) {
                entry = this._objMap.getValue(after);
            }
            if (!entry) {
                entry = this._head.prev;
            }
            this._insert(obj, entry, entry.next);
        };
        List.prototype.pushFront = function (obj, before) {
            var entry = null;
            if (before) {
                entry = this._objMap.getValue(before);
            }
            if (!entry) {
                entry = this._head.next;
            }
            this._insert(obj, entry.prev, entry);
        };
        List.prototype.isEmpty = function () {
            return this._head.next == this._head || this._head.prev == this._head;
        };
        List.prototype.getFront = function () {
            if (this.isEmpty()) {
                return null;
            }
            return this._head.next.obj;
        };
        List.prototype.popFront = function () {
            if (this.isEmpty()) {
                return null;
            }
            var elem = this._head.next;
            this._remove(elem);
            return elem.obj;
        };
        List.prototype.getBack = function () {
            if (this.isEmpty()) {
                return null;
            }
            return this._head.prev.obj;
        };
        List.prototype.popBack = function () {
            if (this.isEmpty()) {
                return null;
            }
            var elem = this._head.prev;
            this._remove(elem);
            return elem.obj;
        };
        List.prototype.getNext = function (obj) {
            var elem = this._objMap.getValue(obj);
            return elem.next.obj;
        };
        List.prototype.getPrev = function (obj) {
            var elem = this._objMap.getValue(obj);
            return elem.prev.obj;
        };
        List.prototype.reverse = function () {
            for (var entry = this._head.next; entry != this._head;) {
                var n = entry.next;
                entry.next = entry.prev;
                entry.prev = n;
                entry = n;
            }
            var headNext = this._head.next;
            var headPrev = this._head.prev;
            this._head.next = headPrev;
            this._head.prev = headNext;
        };
        List.prototype.remove = function (obj) {
            var elem = this._objMap.getValue(obj);
            if (elem) {
                this._remove(elem);
            }
        };
        List.prototype.forEach = function (func, reverse) {
            if (reverse === void 0) {
                reverse = false;
            }
            if (reverse) {
                for (var entry = this._head.prev; entry != this._head; entry = entry.prev) {
                    func(entry.obj);
                }
            } else {
                for (var entry = this._head.next; entry != this._head; entry = entry.next) {
                    func(entry.obj);
                }
            }
        };
        Object.defineProperty(List.prototype, "length", {
            get: function get() {
                return this._objMap.keys().length;
            },
            enumerable: false,
            configurable: true
        });
        List.prototype.clear = function () {
            this._head.next = this._head;
            this._head.prev = this._head;
            this._objMap.clear();
        };
        return List;
    }();
    Collection.List = List;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    var LruCache = function () {
        function LruCache(size, toStringFunc, onDestroyFunc) {
            this._size = 0;
            this._maxSize = 1;
            this._keyToObj = {};
            this._maxSize = size;
            this._toStr = toStringFunc;
            this._onDestroy = onDestroyFunc;
            this._lruList = new Collection.List(toStringFunc);
        }
        LruCache.prototype.get = function (k) {
            return this._keyToObj[k];
        };
        LruCache.prototype.use = function (obj) {
            this._lruList.pushFront(obj);
            var key = this._toStr(obj);
            if (!this._keyToObj[key]) {
                this._keyToObj[key] = obj;
                this._size++;
                if (this._size > this._maxSize) {
                    this._tidy(this._size - this._maxSize);
                }
            }
        };
        LruCache.prototype._tidy = function (cnt) {
            for (var i = 0; i < cnt; ++i) {
                var obj = this._lruList.popBack();
                if (obj) {
                    this._onDestroy(obj);
                    delete this._keyToObj[this._toStr(obj)];
                    this._size--;
                }
            }
        };
        LruCache.prototype.clear = function (destroy) {
            var _this = this;
            if (destroy === void 0) {
                destroy = false;
            }
            this._size = 0;
            this._keyToObj = {};
            if (destroy) {
                this._lruList.forEach(function (obj) {
                    _this._onDestroy(obj);
                });
            }
            this._lruList.clear();
        };
        return LruCache;
    }();
    Collection.LruCache = LruCache;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    var MultiDictionary = function () {
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (allowDuplicateValues === void 0) {
                allowDuplicateValues = false;
            }
            this.dict = new Collection.Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || Collection.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (Collection.isUndefined(values)) {
                return [];
            }
            return Collection.copy(values);
        };
        MultiDictionary.prototype.setValue = function (key, value) {
            if (Collection.isUndefined(key) || Collection.isUndefined(value)) {
                return false;
            }
            var array = this.dict.getValue(key);
            if (Collection.isUndefined(array)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            if (!this.allowDuplicate) {
                if (Collection.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };
        MultiDictionary.prototype.remove = function (key, value) {
            if (Collection.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !Collection.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (!Collection.isUndefined(array) && Collection.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };
        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };
        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var v = values_1[_i];
                for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                    var w = v_1[_a];
                    array.push(w);
                }
            }
            return array;
        };
        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };
        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };
        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };
        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    }();
    Collection.MultiDictionary = MultiDictionary;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    var Queue = function () {
        function Queue() {
            this.items = null;
            this.items = new Array();
        }
        Queue.prototype.enqueue = function (data) {
            this.items.push(data);
        };
        Queue.prototype.dequeue = function () {
            return this.items.shift();
        };
        Queue.prototype.head = function () {
            return this.items[0];
        };
        Queue.prototype.size = function () {
            return this.items.length;
        };
        Queue.prototype.clear = function () {
            this.items = new Array();
        };
        Queue.prototype.isEmpty = function () {
            return this.items.length === 0;
        };
        Queue.prototype.tail = function () {
            return this.items[this.items.length - 1];
        };
        Queue.prototype.toArray = function () {
            return this.items;
        };
        return Queue;
    }();
    Collection.Queue = Queue;
})(Collection || (Collection = {}));
var Collection;
(function (Collection) {
    var Set = function () {
        function Set(toStringFunction) {
            this.dictionary = new Collection.Dictionary(toStringFunction);
        }
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        Set.prototype.add = function (element) {
            if (this.contains(element) || Collection.isUndefined(element)) {
                return false;
            } else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };
        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };
        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };
        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };
        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };
        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            } else {
                this.dictionary.remove(element);
                return true;
            }
        };
        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };
        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };
        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };
        Set.prototype.size = function () {
            return this.dictionary.size();
        };
        Set.prototype.clear = function () {
            this.dictionary.clear();
        };
        Set.prototype.toString = function () {
            return Collection.toString(this.toArray());
        };
        return Set;
    }();
    Collection.Set = Set;
})(Collection || (Collection = {}));
var HotUpdate;
(function (HotUpdate) {
    HotUpdate.CUR_RES_URL_ROOT = "https://fshunj.oss-cn-guangzhou.aliyuncs.com/MiniGameRes/cur/";
    HotUpdate.HOT_UPDATE_URL_ROOT = "https://fshunj.oss-cn-guangzhou.aliyuncs.com/MiniGameRes/LatestVer/";
    HotUpdate.MINIGAME_VERSION_API_URL = HotUpdate.HOT_UPDATE_URL_ROOT + "mini_version.txt";
    HotUpdate.MINIGAME_RES_URL_ROOT = HotUpdate.HOT_UPDATE_URL_ROOT;
})(HotUpdate || (HotUpdate = {}));
var HotUpdate;
(function (HotUpdate) {
    function compareVersion(v1, v2) {
        console.log("版本号:", v1, v2);
        var version1 = v1.split(".");
        var version2 = v2.split(".");
        if (version1.length != version2.length) {
            return 1;
        } else {
            var len = version1.length;
            var i = 0;
            for (; i < len; ++i) {
                var _v1 = parseInt(version1[i]);
                var _v2 = parseInt(version2[i]);
                if (_v1 > _v2) {
                    return 1;
                } else if (_v1 < _v2) {
                    return -1;
                }
            }
            return 0;
        }
    }
    HotUpdate.compareVersion = compareVersion;
    var OpRet = function () {
        function OpRet() {
            this._errcode2Msg = {
                1000: "参数错误",
                1001: "找不到对应版本号",
                1002: "请下载安装最新的版本",
                1003: "版本号错误",
                2000: "文件失效",
                2001: "请求超时",
                2002: "下载失败",
                2003: "正在下载",
                2004: "文件名非法",
                2005: "无法创建下载文件",
                2006: "无法移除旧的文件",
                2007: "解压资源失败",
                3000: "下载资源库配置文件失败",
                3001: "保存资源库配置文件失败",
                3002: "下载配置文件失败",
                4000: "无法获取安装权限",
                4001: "无法调起安装器",
                9000: "服务器错误",
                9001: "请求超时",
                9002: "请检查网络"
            };
        }
        OpRet.prototype.isSuccess = function () {
            return this.errcode == 0;
        };
        return OpRet;
    }();
    HotUpdate.OpRet = OpRet;
    var CheckVersionRet = function (_super) {
        __extends(CheckVersionRet, _super);
        function CheckVersionRet() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.remoteApkVersion = -1;
            return _this;
        }
        CheckVersionRet.prototype.errorMessage = function () {
            return "[检测版本]" + this._errcode2Msg[this.errcode] || "未知错误";
        };
        return CheckVersionRet;
    }(OpRet);
    HotUpdate.CheckVersionRet = CheckVersionRet;
    var MiniGameCheckVersionRet = function (_super) {
        __extends(MiniGameCheckVersionRet, _super);
        function MiniGameCheckVersionRet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MiniGameCheckVersionRet;
    }(CheckVersionRet);
    HotUpdate.MiniGameCheckVersionRet = MiniGameCheckVersionRet;
    var FetchPatchRet = function (_super) {
        __extends(FetchPatchRet, _super);
        function FetchPatchRet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FetchPatchRet.prototype.errorMessage = function () {
            return "[获取信息]" + this._errcode2Msg[this.errcode] || "未知错误";
        };
        return FetchPatchRet;
    }(OpRet);
    HotUpdate.FetchPatchRet = FetchPatchRet;
    var DownloadPatchRet = function (_super) {
        __extends(DownloadPatchRet, _super);
        function DownloadPatchRet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DownloadPatchRet.prototype.errorMessage = function () {
            return "[下载]" + this._errcode2Msg[this.errcode] || "未知错误";
        };
        return DownloadPatchRet;
    }(OpRet);
    HotUpdate.DownloadPatchRet = DownloadPatchRet;
    var ApkUpdateRet = function (_super) {
        __extends(ApkUpdateRet, _super);
        function ApkUpdateRet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ApkUpdateRet.prototype.errorMessage = function () {
            return "[版本更新]" + this._errcode2Msg[this.errcode] || "未知错误";
        };
        return ApkUpdateRet;
    }(OpRet);
    HotUpdate.ApkUpdateRet = ApkUpdateRet;
    var HotUpdateObserver = function () {
        function HotUpdateObserver() {}
        return HotUpdateObserver;
    }();
    HotUpdate.HotUpdateObserver = HotUpdateObserver;
    var ApkUpdateObserver = function () {
        function ApkUpdateObserver() {}
        return ApkUpdateObserver;
    }();
    HotUpdate.ApkUpdateObserver = ApkUpdateObserver;
})(HotUpdate || (HotUpdate = {}));
var HotUpdate;
(function (HotUpdate) {
    var DownloadSettingRet = function (_super) {
        __extends(DownloadSettingRet, _super);
        function DownloadSettingRet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DownloadSettingRet;
    }(HotUpdate.DownloadPatchRet);
    var MiniGameHotUpdateMgr = function () {
        function MiniGameHotUpdateMgr() {
            this._localVersion = "";
            this._observer = null;
            this._buildType = "";
            this._subType = "";
            this.REMOTE_SERVER_ROOT = "";
            this._serverlist = null;
            if (Core.DeviceUtils.isWXGame()) {
                this._buildType = "wxgame";
                this._subType = "wx1";
                this._fs = WXGame.WXFileSystem.inst;
            } else if (Core.DeviceUtils.isQQPlay()) {
                this._buildType = "qqgame";
                this._subType = "qq1";
                this._fs = WXGame.WXFileSystem.inst;
            } else if (Core.DeviceUtils.isTTGame()) {
                this._buildType = "ttgame";
                this._subType = "tt2";
                this._fs = WXGame.WXFileSystem.inst;
            } else {
                throw Error("其他类型的小游戏请在DeviceUtils中支持判定接口！");
            }
            this.REMOTE_SERVER_ROOT = "" + HotUpdate.CUR_RES_URL_ROOT;
            this._localVersion = HotUpdate.miniGameVersionInfo[this._buildType][this._subType];
            var cachedVersion = this._getVersionFromCache();
            if (cachedVersion) {
                this._cachedVerCompareToPackVerRet = HotUpdate.compareVersion(cachedVersion, this._localVersion);
                if (this._cachedVerCompareToPackVerRet > 0) {
                    this._localVersion = cachedVersion;
                    this.REMOTE_SERVER_ROOT = "" + HotUpdate.HOT_UPDATE_URL_ROOT;
                }
            }
        }
        Object.defineProperty(MiniGameHotUpdateMgr, "inst", {
            get: function get() {
                if (!this._inst) {
                    this._inst = new MiniGameHotUpdateMgr();
                }
                return this._inst;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MiniGameHotUpdateMgr.prototype, "version", {
            get: function get() {
                return this._localVersion;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MiniGameHotUpdateMgr.prototype, "buildType", {
            get: function get() {
                return this._buildType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MiniGameHotUpdateMgr.prototype, "subType", {
            get: function get() {
                return this._subType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MiniGameHotUpdateMgr.prototype, "hotUpdateFs", {
            get: function get() {
                return this._fs;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MiniGameHotUpdateMgr.prototype, "serverlist", {
            get: function get() {
                return this._serverlist;
            },
            enumerable: false,
            configurable: true
        });
        MiniGameHotUpdateMgr.prototype._saveVersionToCache = function (v) {
            this._localVersion = v;
            var localVersionStr = cc.sys.localStorage.getItem("__mini_versions__");
            var localVersion = {};
            if (localVersionStr && localVersionStr != "") {
                localVersion = JSON.parse(localVersionStr);
            }
            if (!localVersion[this._buildType]) {
                localVersion[this._buildType] = {};
            }
            localVersion[this._buildType][this._subType] = v;
            cc.sys.localStorage.setItem("__mini_versions__", JSON.stringify(localVersion));
        };
        MiniGameHotUpdateMgr.prototype._getVersionFromCache = function () {
            var cachedVersion = null;
            var localVersionStr = cc.sys.localStorage.getItem("__mini_versions__");
            if (localVersionStr && localVersionStr != "") {
                var localVersion = JSON.parse(localVersionStr);
                if (localVersion[this._buildType] && localVersion[this._buildType][this._subType]) {
                    cachedVersion = localVersion[this._buildType][this._subType];
                }
            }
            return cachedVersion;
        };
        MiniGameHotUpdateMgr.prototype.hotUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ret, remoteVerCompareToLocalVerRet, ret1, ret2, settingStr, settings, re;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this._checkVersion()];
                        case 1:
                            ret = _a.sent();
                            if (!ret.isSuccess()) return [3, 10];
                            console.log("version info loaded");
                            this._serverlist = ret.serverlist;
                            remoteVerCompareToLocalVerRet = HotUpdate.compareVersion(ret.remoteVersion, this._localVersion);
                            if (!(remoteVerCompareToLocalVerRet > 0)) return [3, 6];
                            this.REMOTE_SERVER_ROOT = "" + HotUpdate.HOT_UPDATE_URL_ROOT;
                            console.log("about to download jsonZip");
                            return [4, this._downloadJsonZip(ret.remoteVersion)];
                        case 2:
                            ret1 = _a.sent();
                            if (!ret1.isSuccess()) return [3, 4];
                            console.log("jsonZip downloaded ,about to download settingFile");
                            return [4, this._downloadSettingFile(ret.remoteVersion)];
                        case 3:
                            ret2 = _a.sent();
                            if (ret2.isSuccess()) {
                                if (this._observer && this._observer.onDownloadDone) {
                                    this._observer.onDownloadDone(ret.errcode, ret2.errorMessage());
                                }
                                settingStr = ret2.settingStr;
                                if (settingStr && settingStr != "") {
                                    console.log("settingFile downloaded and init AssetLibrary.");
                                    settings = JSON.parse(settingStr);
                                    if (settings) {
                                        this._initAssetLibrary(settings);
                                        this._saveVersionToCache(ret.remoteVersion);
                                        return [2, { success: true }];
                                    } else {
                                        this.REMOTE_SERVER_ROOT = "" + HotUpdate.CUR_RES_URL_ROOT;
                                        return [2, { success: false, reason: "加载载资源库配置出错，请清理资源后再试！" }];
                                    }
                                } else {
                                    this.REMOTE_SERVER_ROOT = "" + HotUpdate.CUR_RES_URL_ROOT;
                                    return [2, { success: false, reason: "下载资源库配置出错！" }];
                                }
                            } else {
                                this.REMOTE_SERVER_ROOT = "" + HotUpdate.CUR_RES_URL_ROOT;
                                return [2, { success: false, reason: ret2.errorMessage() }];
                            }
                            return [3, 5];
                        case 4:
                            this.REMOTE_SERVER_ROOT = "" + HotUpdate.CUR_RES_URL_ROOT;
                            return [2, { success: false, reason: ret1.errorMessage() }];
                        case 5:
                            return [3, 9];
                        case 6:
                            if (!(this._cachedVerCompareToPackVerRet > 0)) return [3, 8];
                            this.REMOTE_SERVER_ROOT = "" + HotUpdate.HOT_UPDATE_URL_ROOT;
                            return [4, this._loadSettingsFromCached()];
                        case 7:
                            re = _a.sent();
                            if (re) {
                                return [2, { success: true }];
                            } else {
                                return [2, { success: false, reason: "资源错误，请点击清理按钮清理资源！" }];
                            }
                            return [3, 9];
                        case 8:
                            if (remoteVerCompareToLocalVerRet == 0) {}
                            return [2, { success: true }];
                        case 9:
                            return [3, 11];
                        case 10:
                            return [2, { success: false, reason: ret.errorMessage() }];
                        case 11:
                            return [2];
                    }
                });
            });
        };
        MiniGameHotUpdateMgr.prototype.registerObserver = function (ob) {
            this._observer = ob;
        };
        MiniGameHotUpdateMgr.prototype._checkVersion = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._observer && this._observer.onCheckVersion) {
                                this._observer.onCheckVersion();
                            }
                            return [4, new Promise(function (resolve) {
                                var url = HotUpdate.MINIGAME_VERSION_API_URL;
                                var xmlReq = cc.loader.getXMLHttpRequest();
                                xmlReq.open("GET", url);
                                xmlReq.responseType = "text";
                                xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                xmlReq.onreadystatechange = function () {
                                    if (xmlReq.readyState == 4) {
                                        var ret_1 = new HotUpdate.MiniGameCheckVersionRet();
                                        if (xmlReq.status >= 200 && xmlReq.status <= 304) {
                                            var response = JSON.parse(xmlReq.responseText);
                                            var code = response["code"];
                                            ret_1.errcode = code;
                                            if (code == 0) {
                                                ret_1.remoteVersion = response["version"];
                                                ret_1.serverlist = response["serverlist"];
                                            }
                                        } else {
                                            ret_1.errcode = 9000;
                                        }
                                        console.log("_checkVersion request error status: ", xmlReq.status);
                                        resolve(ret_1);
                                    }
                                };
                                xmlReq.onload = function () {};
                                xmlReq.ontimeout = function () {
                                    var ret = new HotUpdate.MiniGameCheckVersionRet();
                                    ret.errcode = 9001;
                                    resolve(ret);
                                };
                                xmlReq.onerror = function () {
                                    var ret = new HotUpdate.MiniGameCheckVersionRet();
                                    ret.errcode = 9002;
                                    resolve(ret);
                                };
                                xmlReq.send();
                            })];
                        case 1:
                            ret = _a.sent();
                            if (this._observer && this._observer.onCheckVersionDone) {
                                this._observer.onCheckVersionDone(ret.errcode, ret.errorMessage());
                            }
                            return [2, ret];
                    }
                });
            });
        };
        MiniGameHotUpdateMgr.prototype._downloadSettingFile = function (remoteVersion) {
            return __awaiter(this, void 0, void 0, function () {
                var ret, url, settingsStr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ret = new DownloadSettingRet();
                            url = this.REMOTE_SERVER_ROOT + ("settings_" + remoteVersion + ".txt");
                            return [4, this._fs.xhrLoad(url, null, null, true).catch(function (error) {
                                console.error("[MiniGameHotUpdate] download setting file exception: ", error);
                                return "";
                            })];
                        case 1:
                            settingsStr = _a.sent();
                            if (!(settingsStr && settingsStr != "")) return [3, 3];
                            return [4, this._fs.writeFile("settings.txt", settingsStr)];
                        case 2:
                            if (_a.sent()) {
                                ret.errcode = 0;
                                ret.settingStr = settingsStr;
                            } else {
                                ret.errcode = 3001;
                            }
                            return [3, 4];
                        case 3:
                            ret.errcode = 3000;
                            _a.label = 4;
                        case 4:
                            return [2, ret];
                    }
                });
            });
        };
        MiniGameHotUpdateMgr.prototype._downloadJsonZip = function (remoteVersion) {
            return __awaiter(this, void 0, void 0, function () {
                var fileName, self, ret, downloadRet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fileName = "json_" + remoteVersion + ".zip";
                            self = this;
                            return [4, this._fs.loadRemoteImportZipFile(fileName, function (res) {
                                if (self._observer && self._observer.onDownloadProgress) {
                                    self._observer.onDownloadProgress(res.totalBytesWritten, res.totalBytesExpectedToWrite);
                                }
                            })];
                        case 1:
                            ret = _a.sent();
                            downloadRet = new HotUpdate.DownloadPatchRet();
                            if (ret) {
                                downloadRet.errcode = 0;
                            } else {
                                downloadRet.errcode = 3002;
                            }
                            return [2, downloadRet];
                    }
                });
            });
        };
        MiniGameHotUpdateMgr.prototype._loadSettingsFromCached = function () {
            return __awaiter(this, void 0, void 0, function () {
                var settingsStr, settings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("WXHotUpdate already up to date, load cached settings.json");
                            return [4, this._fs.readFile("settings.txt", "utf-8")];
                        case 1:
                            settingsStr = _a.sent();
                            if (settingsStr && settingsStr != "") {
                                settings = JSON.parse(settingsStr);
                                this._initAssetLibrary(settings);
                                return [2, true];
                            } else {
                                return [2, false];
                            }
                            return [2];
                    }
                });
            });
        };
        MiniGameHotUpdateMgr.prototype._initAssetLibrary = function (settings) {
            if (!settings.debug) {
                var uuids = settings.uuids;
                var rawAssets = settings.rawAssets;
                var assetTypes = settings.assetTypes;
                var realRawAssets = settings.rawAssets = {};
                var rawAssetKeys = Object.keys(rawAssets);
                for (var _i = 0, rawAssetKeys_1 = rawAssetKeys; _i < rawAssetKeys_1.length; _i++) {
                    var mount = rawAssetKeys_1[_i];
                    var entries = rawAssets[mount];
                    var realEntries = realRawAssets[mount] = {};
                    for (var _a = 0, _b = Object.keys(entries); _a < _b.length; _a++) {
                        var id = _b[_a];
                        var entry = entries[id];
                        var type = entry[1];
                        if (typeof type == 'number') {
                            entry[1] = assetTypes[type];
                        }
                        var _id = parseInt(id);
                        realEntries[uuids[_id] || id] = entry;
                    }
                }
                var packedAssets = settings.packedAssets;
                var packedAssetsKeys = Object.keys(packedAssets);
                for (var _c = 0, packedAssetsKeys_1 = packedAssetsKeys; _c < packedAssetsKeys_1.length; _c++) {
                    var packId = packedAssetsKeys_1[_c];
                    var packedIds = packedAssets[packId];
                    var j = 0;
                    var length = packedIds.length;
                    for (; j < length; ++j) {
                        if (typeof packedIds[j] == 'number') {
                            packedIds[j] = uuids[packedIds[j]];
                        }
                    }
                }
                var scenes = settings.scenes;
                for (var i = 0; i < scenes.length; ++i) {
                    var scene = scenes[i];
                    if (typeof scene.uuid === 'number') {
                        scene.uuid = uuids[scene.uuid];
                    }
                }
                var t = settings.uuids,
                    r = settings.md5AssetsMap;
                for (var s in r) {
                    for (var obj = r[s], n = 0; n < obj.length; n += 2) {
                        "number" == typeof i[n] && (i[n] = t[i[n]]);
                    }
                }var subpackages = settings.subpackages;
                for (var subId in subpackages) {
                    var uuidArray = subpackages[subId].uuids;
                    if (uuidArray) {
                        for (var k = 0, l = uuidArray.length; k < l; k++) {
                            if (typeof uuidArray[k] === 'number') {
                                uuidArray[k] = uuids[uuidArray[k]];
                            }
                        }
                    }
                }
            }
            var options = {
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: settings.rawAssets,
                packedAssets: settings.packedAssets,
                md5AssetsMap: settings.md5AssetsMap
            };
            var md5Pipe = cc.loader.md5Pipe;
            if (md5Pipe) {
                cc.loader.removePipe(md5Pipe);
            }
            cc.AssetLibrary.init(options);
            console.log("------ initAssetLibrary with options: ", options);
        };
        return MiniGameHotUpdateMgr;
    }();
    HotUpdate.MiniGameHotUpdateMgr = MiniGameHotUpdateMgr;
    function MiniGameHotUpdate(ob) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MiniGameHotUpdateMgr.inst.registerObserver(ob);
                        return [4, MiniGameHotUpdateMgr.inst.hotUpdate()];
                    case 1:
                        return [2, _a.sent()];
                }
            });
        });
    }
    HotUpdate.MiniGameHotUpdate = MiniGameHotUpdate;
    function updateLoadingHint(hint) {
        window["GameLogic"]["updateLoadingHint"](hint);
    }
    function checkMiniGamePackageUpdate() {
        return __awaiter(this, void 0, void 0, function () {
            var namespace, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        namespace = wx;
                        if (Core.DeviceUtils.isTTGame()) {
                            namespace = tt;
                        }
                        if (namespace.getUpdateManager == undefined) {
                            return [2];
                        }
                        r = null;
                        return [4, new Promise(function (resolve) {
                            r = resolve;
                            var updateManager = namespace.getUpdateManager();
                            var resolveCheck = function resolveCheck() {
                                if (r) {
                                    r();
                                    r = null;
                                }
                            };
                            updateManager.onCheckForUpdate(function (res) {
                                console.log("MiniGameHotUpdate has new app package: ", res.hasUpdate);
                                if (res.hasUpdate) {
                                    updateLoadingHint("检测到新的版本，正在下载，请稍候...");
                                } else {
                                    updateLoadingHint("");
                                    resolveCheck();
                                }
                            });
                            updateManager.onUpdateReady(function () {
                                updateLoadingHint("");
                                namespace.showModal({
                                    title: '更新提示',
                                    content: '新版本已下载，请重启游戏',
                                    showCancel: false,
                                    success: function success(res) {
                                        if (res.confirm) {
                                            updateManager.applyUpdate();
                                        } else {
                                            resolveCheck();
                                        }
                                    },
                                    fail: function fail(res) {
                                        resolveCheck();
                                    }
                                });
                            });
                            updateManager.onUpdateFailed(function () {
                                updateLoadingHint("");
                                resolveCheck();
                            });
                            if (Core.DeviceUtils.isTTGame()) {
                                resolveCheck();
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    }
    HotUpdate.checkMiniGamePackageUpdate = checkMiniGamePackageUpdate;
})(HotUpdate || (HotUpdate = {}));
var HotUpdate;
(function (HotUpdate) {
    HotUpdate.miniGameVersionInfo = {
        "kgame": {
            "kg1": "0.0.0",
            "kg2": "0.0.0"
        },
        "qqgame": {
            "qq1": "0.1.76",
            "qq2": "0.1.71",
            "qq3": "0.1.73"
        },
        "ttgame": {
            "tt1": "0.0.0",
            "tt2": "0.0.0",
            "tt3": "0.0.0"
        },
        "wxgame": {
            "wx1": "0.2.58",
            "wx2": "0.2.58",
            "wx3": "0.2.58"
        }
    };
})(HotUpdate || (HotUpdate = {}));
var HotUpdate;
(function (HotUpdate) {
    HotUpdate.nativeVersionInfo = {
        "banshu": {
            "android": "0.0.1",
            "ios": "0.0.0"
        },
        "chess": {
            "android": "0.0.28",
            "ios": "0.1.16"
        },
        "openew": {
            "android": "0.2.31",
            "ios": "0.7.22",
            "pc": "0.7.30"
        },
        "test": {
            "android": "1.0.95",
            "ios": "0.0.0"
        },
        "xianfeng": {
            "android": "0.0.28",
            "ios": "0.0.1"
        }
    };
})(HotUpdate || (HotUpdate = {}));
var Entry = function () {
    function Entry() {}
    Object.defineProperty(Entry, "inst", {
        get: function get() {
            if (this._inst == null) {
                this._inst = new Entry();
            }
            return this._inst;
        },
        enumerable: false,
        configurable: true
    });
    Entry.prototype.enterMain = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4, WXGame.CocosWXDownloader.initLoaders()];
                    case 1:
                        _a.sent();
                        Test.inst.run();
                        return [2];
                }
            });
        });
    };
    Entry._inst = null;
    return Entry;
}();
function main() {
    Entry.inst.enterMain();
}
function start() {}
function update() {}
function destroy() {}
if (!window["GameLogic"]) {
    window["GameLogic"] = {};
}
window["GameLogic"]["entry"] = main;
window["GameLogic"]["start"] = start;
window["GameLogic"]["update"] = update;
window["GameLogic"]["destroy"] = destroy;
var Test = function () {
    function Test() {}
    Object.defineProperty(Test, "inst", {
        get: function get() {
            if (this._inst == null) {
                this._inst = new Test();
            }
            return this._inst;
        },
        enumerable: false,
        configurable: true
    });
    Test.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("run start");
                TestHotUpdate.inst.run();
                return [2];
            });
        });
    };
    Test._inst = null;
    return Test;
}();
var TestHotUpdate = function () {
    function TestHotUpdate() {}
    Object.defineProperty(TestHotUpdate, "inst", {
        get: function get() {
            if (this._inst == null) {
                this._inst = new TestHotUpdate();
            }
            return this._inst;
        },
        enumerable: false,
        configurable: true
    });
    TestHotUpdate.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var btn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("TestHotUpdate start");
                        btn = cc.find("Canvas/hotUpdate");
                        if (btn) {
                            btn.on(cc.Node.EventType.TOUCH_END, function () {
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                return [4, this.testHotUpdate()];
                                            case 1:
                                                _a.sent();
                                                return [4, this.test2_new()];
                                            case 2:
                                                _a.sent();
                                                return [2];
                                        }
                                    });
                                });
                            });
                        }
                        return [4, this.test2()];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            console.log("cc.loader._cache:", cc.loader["_cache"]);
                        }, 10);
                        return [2];
                }
            });
        });
    };
    TestHotUpdate.prototype.testHotUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ob = new HotUpdate.HotUpdateObserver();
                        ob.onCheckVersion = function () {
                            console.log("onCheckVersion");
                        };
                        ob.onCheckVersionDone = function (errcode, message) {
                            console.log("onCheckVersionDone--", errcode, message);
                        };
                        ob.onFetchPatchUri = function () {
                            console.log("onFetchPatchUri");
                        };
                        ob.onFetchPatchUriDone = function (errcode, message) {
                            console.log("onFetchPatchUriDone");
                        };
                        ob.onDownload = function () {
                            console.log("onDownload");
                        };
                        ob.onDownloadProgress = function (current, total) {
                            console.log("onDownloadProgress--", "current:", current, "--", "total:", total);
                        };
                        ob.onUnzipProgress = function (current, total) {
                            console.log("onUnzipProgress--");
                        };
                        ob.onDownloadDone = function (errcode, message) {
                            console.log("onDownloadDone");
                        };
                        HotUpdate.MiniGameHotUpdateMgr.inst.registerObserver(ob);
                        return [4, HotUpdate.MiniGameHotUpdateMgr.inst.hotUpdate()];
                    case 1:
                        _a.sent();
                        console.log("热更完毕");
                        return [2];
                }
            });
        });
    };
    TestHotUpdate.prototype.test1 = function () {
        console.log("热更后，就有了206这张图片了，这时候加载这个图片");
        cc.loader.loadRes('card_m/206', cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            var spriteNode = cc.find("Canvas/sprite");
            var sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
        });
    };
    TestHotUpdate.prototype.test2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                    cc.loader.loadRes('card_m/204', cc.SpriteFrame, function (err, spriteFrame) {
                        if (err) {
                            cc.error(err.message || err);
                            reject(false);
                        }
                        var spriteNode = cc.find("Canvas/sprite");
                        var sprite = spriteNode.addComponent(cc.Sprite);
                        sprite.spriteFrame = spriteFrame;
                        resolve(true);
                    });
                })];
            });
        });
    };
    TestHotUpdate.prototype.test2_new = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spriteNode, sprite, sf, t2d;
            return __generator(this, function (_a) {
                spriteNode = cc.find("Canvas/sprite");
                sprite = spriteNode.getComponent(cc.Sprite);
                sf = sprite.spriteFrame;
                t2d = sf.getTexture();
                console.log("原spriteFrame信息：", sf);
                cc.loader.release(sf);
                cc.loader.release(t2d);
                spriteNode.removeComponent(sprite);
                return [2, new Promise(function (resolve, reject) {
                    cc.loader.loadRes('card_m/204', cc.SpriteFrame, function (err, spriteFrame) {
                        console.log("新spriteFrame信息：", spriteFrame);
                        if (err) {
                            cc.error(err.message || err);
                            reject(false);
                        }
                        var spriteNode = cc.find("Canvas/sprite");
                        var sprite = spriteNode.addComponent(cc.Sprite);
                        sprite.spriteFrame = spriteFrame;
                        setTimeout(function () {
                            console.log("cc.loader._cache:", cc.loader["_cache"]);
                            resolve(true);
                        }, 10);
                    });
                })];
            });
        });
    };
    TestHotUpdate._inst = null;
    return TestHotUpdate;
}();
var TestMiniGame = function () {
    function TestMiniGame() {}
    Object.defineProperty(TestMiniGame, "inst", {
        get: function get() {
            if (this._inst == null) {
                this._inst = new TestMiniGame();
            }
            return this._inst;
        },
        enumerable: false,
        configurable: true
    });
    TestMiniGame.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("TestMiniGame..");
                        return [4, this.test2()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    TestMiniGame.prototype.test1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rootDir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootDir = "" + wx.env.USER_DATA_PATH;
                        console.log("当前本地用户目录根目录如下：");
                        return [4, this.testCreateDir("aaa")];
                    case 1:
                        _a.sent();
                        return [4, this.testListDir("" + rootDir)];
                    case 2:
                        _a.sent();
                        return [4, this.isDirOrFileExist("aaa")];
                    case 3:
                        if (_a.sent()) {
                            console.log("aaa 目录 存在于本地用户目录");
                        } else {
                            console.log("aaa 目录 不存在");
                        }
                        return [4, this.isDirOrFileExist(rootDir + "/kk")];
                    case 4:
                        if (!_a.sent()) return [3, 6];
                        console.log("dir-kk exist");
                        return [4, this.testRmDirRecursive(rootDir + "/kk")];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        return [4, this.isDirOrFileExist(rootDir + "/myZip.zip")];
                    case 7:
                        if (!_a.sent()) return [3, 9];
                        console.log("myZip.zip exist");
                        return [4, this.testUnlinkFile(rootDir + "/myZip.zip")];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        return [4, this.isDirOrFileExist(rootDir + "/json_1.1.txt")];
                    case 10:
                        if (!_a.sent()) return [3, 12];
                        console.log("json_1.1.txt exist");
                        return [4, this.testUnlinkFile(rootDir + "/json_1.1.txt")];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        console.log("清空缓存后--");
                        return [4, this.testListDir("" + rootDir)];
                    case 13:
                        _a.sent();
                        return [4, this.testListDir(rootDir + "/gamecaches")];
                    case 14:
                        _a.sent();
                        return [4, this.testCreateDir("kk")];
                    case 15:
                        _a.sent();
                        return [4, this.testWriteFile()];
                    case 16:
                        _a.sent();
                        return [4, this.testListDir("" + rootDir)];
                    case 17:
                        _a.sent();
                        return [4, this.testListDir(rootDir + "/kk")];
                    case 18:
                        _a.sent();
                        return [4, this.testAccessDirAndRead()];
                    case 19:
                        _a.sent();
                        return [4, this.testUnlinkFile("" + wx.env.USER_DATA_PATH + "/kk/tmp.txt")];
                    case 20:
                        _a.sent();
                        return [4, this.testListDir(rootDir + "/kk")];
                    case 21:
                        _a.sent();
                        return [4, this.testDownloadFile()];
                    case 22:
                        _a.sent();
                        return [4, this.unzipFile("" + rootDir)];
                    case 23:
                        _a.sent();
                        return [4, this.testListDir("" + rootDir)];
                    case 24:
                        _a.sent();
                        return [4, this.testFileExistAndRead(rootDir + "/json_1.1.txt")];
                    case 25:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    TestMiniGame.prototype.testWriteFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    FileSystemManager.writeFile({
                        filePath: wx.env.USER_DATA_PATH + '/kk/tmp.txt',
                        data: '1111',
                        encoding: 'utf8',
                        success: function success(res) {
                            console.info("write success:" + res);
                            resolve();
                        },
                        fail: function fail(err) {
                            console.info("write failed:", err.error, ":", err.errMsg);
                            reject();
                        },
                        complete: null
                    });
                })];
            });
        });
    };
    TestMiniGame.prototype.testListDir = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                fs = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    fs.readdir({
                        dirPath: "" + path,
                        success: function success(res) {
                            console.log("success to list dir:" + path + "--->", res.files);
                            resolve();
                        },
                        fail: function fail(err) {
                            console.error("list dir err", err.errMsg);
                            reject();
                        },
                        complete: null
                    });
                })];
            });
        });
    };
    TestMiniGame.prototype.testFileExistAndRead = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    var path = "" + filePath;
                    var success = function success(res) {
                        console.log(filePath + " \u5B58\u5728:", res);
                        FileSystemManager.readFile({
                            filePath: filePath,
                            encoding: 'utf8',
                            success: function success(res) {
                                console.log(filePath + " \u5185\u5BB9\u662F-->", res.data);
                                resolve();
                            },
                            fail: function fail(err) {
                                console.log("read " + filePath + " failed;");
                            },
                            complete: null
                        });
                    };
                    var fail = function fail(err) {
                        console.log("fail to access dir ", filePath, err);
                        reject();
                    };
                    var complete = function complete() {
                        console.log("complete");
                    };
                    FileSystemManager.access({ path: path, success: success, fail: fail, complete: complete });
                })];
            });
        });
    };
    TestMiniGame.prototype.isDirOrFileExist = function (dirOrFile) {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    var path = dirOrFile;
                    var success = function success(res) {
                        console.log(dirOrFile + "-\u5B58\u5728", res);
                        resolve(true);
                    };
                    var fail = function fail(err) {
                        console.log(dirOrFile + " does not exit", err);
                        resolve(false);
                    };
                    var complete = function complete() {};
                    FileSystemManager.access({ path: path, success: success, fail: fail, complete: complete });
                })];
            });
        });
    };
    TestMiniGame.prototype.testAccessDirAndRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    var path = wx.env.USER_DATA_PATH + "/kk";
                    var success = function success(res) {
                        console.log('kk目录存在', res);
                        FileSystemManager.readFile({
                            filePath: wx.env.USER_DATA_PATH + '/kk/tmp.txt',
                            encoding: 'utf8',
                            success: function success(res) {
                                console.log("kk/tmp.txt is:-->", res.data);
                                resolve();
                            },
                            fail: function fail(err) {
                                console.log("read file kk/tmp.txt failed;");
                            },
                            complete: function complete() {
                                console.log("read file kk/tmp.txt completed;");
                            }
                        });
                    };
                    var fail = function fail(err) {
                        console.log("fail to access dir kk", err);
                        reject();
                    };
                    var complete = function complete() {
                        console.log("complete");
                    };
                    FileSystemManager.access({ path: path, success: success, fail: fail, complete: complete });
                })];
            });
        });
    };
    TestMiniGame.prototype.testCreateDir = function (dirName) {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    FileSystemManager.mkdir({
                        dirPath: wx.env.USER_DATA_PATH + "/" + dirName,
                        success: function success(res) {
                            console.log('success make dir', res);
                            resolve();
                        },
                        fail: function fail(err) {
                            console.log('fail to make dir', err);
                            ;
                            reject();
                        },
                        complete: function complete(err) {
                            console.log('complete', err);
                            ;
                        }
                    });
                })];
            });
        });
    };
    TestMiniGame.prototype.testUnlinkFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                fs = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    fs.unlink({
                        filePath: path,
                        success: function success(res) {
                            console.log("success to delete file:" + path, res);
                            resolve();
                        },
                        fail: function fail(err) {
                            console.error("fail to delete file:" + path, err.errMsg);
                            reject();
                        }
                    });
                })];
            });
        });
    };
    TestMiniGame.prototype.testRmDirRecursive = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            return __generator(this, function (_a) {
                fs = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    var option = {
                        dirPath: path,
                        recursive: true,
                        success: function success(v) {
                            console.log("delete dir:" + path);
                            resolve(v);
                        },
                        fail: function fail(e) {
                            console.error("delete dir error:", e.errMsg);
                            reject(null);
                        },
                        complete: function complete(res) {}
                    };
                    fs.rmdir(option);
                })];
            });
        });
    };
    TestMiniGame.prototype.testDownloadFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fs;
            var _this = this;
            return __generator(this, function (_a) {
                fs = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    var url = "https://fshunj.oss-cn-guangzhou.aliyuncs.com/zip/json_1.1.zip";
                    var option = {
                        url: url,
                        success: function success(v) {
                            if (v.statusCode >= 400) {
                                reject(null);
                            } else {
                                console.log("download success:", v);
                                _this._tempFilePath = v.tempFilePath;
                                resolve(v);
                            }
                        },
                        fail: function fail(e) {
                            console.error("download error:", e.errMsg);
                        },
                        complete: function complete(res) {}
                    };
                    wx.downloadFile(option);
                })];
            });
        });
    };
    TestMiniGame.prototype.testSaveFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            var _this = this;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    if (_this._tempFilePath) {
                        var option = {
                            tempFilePath: _this._tempFilePath,
                            filePath: wx.env.USER_DATA_PATH + "/myZip.zip",
                            success: function success(res) {
                                console.log("save file success:保存后的文件路径是 ", res);
                                resolve(res);
                            },
                            fail: function fail(e) {
                                console.error("save file failed:", e.errMsg);
                                reject();
                            },
                            complete: function complete() {}
                        };
                        console.log("options is ", option);
                        FileSystemManager.saveFile(option);
                    } else {
                        reject();
                    }
                })];
            });
        });
    };
    TestMiniGame.prototype.unzipFile = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var FileSystemManager;
            var _this = this;
            return __generator(this, function (_a) {
                FileSystemManager = wx.getFileSystemManager();
                return [2, new Promise(function (resolve, reject) {
                    var fs = wx.getFileSystemManager();
                    fs.unzip({
                        zipFilePath: "" + _this._tempFilePath,
                        targetPath: "" + path,
                        success: function success(res) {
                            console.log("unzip success!", res);
                            resolve(res);
                        },
                        fail: function fail(err) {
                            console.log('fail', err.errMsg, "errCode:", err.errCode);
                            reject();
                        },
                        complete: function complete() {}
                    });
                })];
            });
        });
    };
    TestMiniGame.prototype.testMiniGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    TestMiniGame.prototype.load204Card = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                    cc.loader.loadRes('card_m/204', cc.Texture2D, function (err, tex2d) {
                        resolve();
                    });
                })];
            });
        });
    };
    TestMiniGame.prototype.test2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4, this.load204Card()];
                    case 1:
                        _a.sent();
                        cc.loader.release("card_m/204");
                        return [2];
                }
            });
        });
    };
    TestMiniGame.prototype.test3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("1");
                                    return [4, this.test2()];
                                case 1:
                                    _a.sent();
                                    setTimeout(function () {
                                        return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        console.log("2");
                                                        cc.loader.release("card_m/205");
                                                        return [4, this.test2()];
                                                    case 1:
                                                        _a.sent();
                                                        console.log("3");
                                                        return [2];
                                                }
                                            });
                                        });
                                    }, 5000);
                                    return [2];
                            }
                        });
                    });
                }, 5000);
                return [2];
            });
        });
    };
    TestMiniGame._inst = null;
    return TestMiniGame;
}();
var WXGame;
(function (WXGame) {
    var WXFileSystem = function () {
        function WXFileSystem() {
            this._NO_VERSION = "n";
            this._downloadFailRetryCnt = 30;
            if (Core.DeviceUtils.isQQPlay()) {
                this._fs = qq.getFileSystemManager();
            } else {
                this._fs = wx.getFileSystemManager();
            }
            console.log("WXLoaders !!!!!!!", this._fs);
            this._dirCache = new Collection.Dictionary();
            this._fsRoot = wx.env.USER_DATA_PATH + "/";
            this._fsCacheFile = "cached_file_path_v1.info";
            this._fsCachePathInfo = {};
            this._dirty = false;
            this._saving = false;
            this._mkdirPromise = new Collection.Dictionary();
            this._isNewDownloader = false;
        }
        Object.defineProperty(WXFileSystem, "inst", {
            get: function get() {
                if (!WXFileSystem._inst) {
                    WXFileSystem._inst = new WXFileSystem();
                }
                return WXFileSystem._inst;
            },
            enumerable: false,
            configurable: true
        });
        WXFileSystem.prototype.startSaveFileHeartbeat = function () {};
        WXFileSystem.prototype._savePathFile = function () {
            return __awaiter(this, void 0, void 0, function () {
                var str;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this._dirty && !this._saving)) return [3, 2];
                            this._dirty = false;
                            this._saving = true;
                            str = JSON.stringify(this._fsCachePathInfo);
                            return [4, this.writeFile(this._fsCacheFile, str)];
                        case 1:
                            _a.sent();
                            console.log("saving version file, size = ", str.length);
                            console.log(this._fsCachePathInfo);
                            this._saving = false;
                            _a.label = 2;
                        case 2:
                            return [2];
                    }
                });
            });
        };
        WXFileSystem.prototype.deleteAllCache = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.access(this._fsCacheFile)];
                        case 1:
                            if (!_a.sent()) return [3, 5];
                            return [4, this.unlink(this._fsCacheFile)];
                        case 2:
                            _a.sent();
                            return [4, this.dirExists("res")];
                        case 3:
                            if (!_a.sent()) return [3, 5];
                            return [4, this.deleteCache("res").catch(function (error) {
                                console.error(error);
                            }).then(function (res) {
                                console.log("[deleteAllCache] res = ", res);
                                _this.exitGame();
                            })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            return [2];
                    }
                });
            });
        };
        WXFileSystem.prototype.exitGame = function () {
            wx.exitMiniProgram({
                success: function success() {},
                fail: function fail() {
                    console.log("退出游戏失败，请重启微信并进入游戏~");
                },
                complete: function complete() {}
            });
        };
        WXFileSystem.prototype.restartGame = function () {
            if (wx.restartMiniProgram) wx.restartMiniProgram();else this.exitGame();
        };
        WXFileSystem.prototype.deleteImportJsonCache = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.dirExists("res")];
                        case 1:
                            if (!_a.sent()) return [3, 4];
                            console.log("res 文件夹存在");
                            return [4, this.dirExists("res/import")];
                        case 2:
                            if (!_a.sent()) return [3, 4];
                            console.log("res/import文件夹存在");
                            return [4, this.rmdir("res/import").catch(function (error) {
                                console.error(error);
                                return false;
                            }).then(function (res) {
                                console.log("delete res/import res = ", res);
                                return true;
                            })];
                        case 3:
                            ret = _a.sent();
                            if (ret) {
                                this._fsCachePathInfo[".json"] = {};
                                this._dirty = true;
                                return [2, true];
                            } else {
                                return [2, false];
                            }
                            _a.label = 4;
                        case 4:
                            return [2, true];
                    }
                });
            });
        };
        WXFileSystem.prototype.initFilePathInfos = function () {
            return __awaiter(this, void 0, void 0, function () {
                var infoStr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.access(this._fsCacheFile)];
                        case 1:
                            if (!!_a.sent()) return [3, 3];
                            this._isNewDownloader = true;
                            return [4, this.writeFile(this._fsCacheFile, "{}")];
                        case 2:
                            if (!_a.sent()) {
                                console.error("can't init file version info");
                            }
                            _a.label = 3;
                        case 3:
                            return [4, this.readFile(this._fsCacheFile, "utf8")];
                        case 4:
                            infoStr = _a.sent();
                            if (!infoStr) {
                                console.error("can't read file version info");
                            } else {
                                this._fsCachePathInfo = JSON.parse(infoStr);
                            }
                            return [2];
                    }
                });
            });
        };
        Object.defineProperty(WXFileSystem.prototype, "isNewDownloader", {
            get: function get() {
                return this._isNewDownloader;
            },
            enumerable: false,
            configurable: true
        });
        WXFileSystem.prototype.setFileLocalPath = function (item, path) {
            return __awaiter(this, void 0, void 0, function () {
                var uuid, rawUrl, extName, oldPath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuid = this.getItemUuid(item);
                            if (!uuid) {
                                console.error("setFileLocalPath can't get uuid for item", item);
                                return [2];
                            }
                            this._dirty = true;
                            rawUrl = item.rawUrl;
                            extName = cc.path.extname(rawUrl);
                            if (!this._fsCachePathInfo[extName]) {
                                this._fsCachePathInfo[extName] = {};
                            }
                            oldPath = this._fsCachePathInfo[extName][uuid];
                            this._fsCachePathInfo[extName][uuid] = path;
                            if (!(oldPath && oldPath != path)) return [3, 2];
                            console.log("unlink old asset: ", oldPath, "new path: ", path);
                            return [4, this.unlink(oldPath, false)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            return [2];
                    }
                });
            });
        };
        Object.defineProperty(WXFileSystem.prototype, "fsRoot", {
            get: function get() {
                return this._fsRoot;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WXFileSystem.prototype, "wxFs", {
            get: function get() {
                return this._fs;
            },
            enumerable: false,
            configurable: true
        });
        WXFileSystem.prototype.isRemotePath = function (p) {
            return p.indexOf("http://") == 0 || p.indexOf("https://") == 0;
        };
        WXFileSystem.prototype.getLocalFilePath = function (p) {
            return p.split("?")[0];
        };
        WXFileSystem.prototype.getWXFilePath = function (p) {
            return this._fsRoot + p;
        };
        WXFileSystem.prototype.getFileVersion = function (p) {
            var arr = p.split("?");
            if (arr.length >= 2) {
                return arr[1];
            } else {
                return null;
            }
        };
        WXFileSystem.prototype.getItemUuid = function (item) {
            var rawUrl = item.rawUrl;
            if (!rawUrl) {
                return null;
            }
            var fileNames = cc.path.mainFileName(rawUrl).split("/");
            var uuid = fileNames[fileNames.length - 1];
            return uuid;
        };
        WXFileSystem.prototype.itemExistsInCache = function (item, localPath) {
            var uuid = this.getItemUuid(item);
            if (!uuid) {
                return false;
            }
            var rawUrl = item.rawUrl;
            var extName = cc.path.extname(rawUrl);
            if (!this._fsCachePathInfo[extName]) {
                return false;
            }
            return this._fsCachePathInfo[extName][uuid] == localPath;
        };
        WXFileSystem.prototype.dirExists = function (dir) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._dirCache.getValue(dir)) return [3, 1];
                            return [2, true];
                        case 1:
                            return [4, this.access(dir)];
                        case 2:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.readFile = function (p, encoding, withRootDir) {
            if (withRootDir === void 0) {
                withRootDir = true;
            }
            return __awaiter(this, void 0, void 0, function () {
                var path;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = p;
                            if (withRootDir) {
                                path = this._fsRoot + p;
                            }
                            return [4, new Promise(function (resolve) {
                                _this._fs.readFile({
                                    filePath: path,
                                    encoding: encoding,
                                    success: function success(res) {
                                        resolve(res.data);
                                    },
                                    fail: function fail(res) {
                                        console.error(res);
                                        resolve(null);
                                    },
                                    complete: function complete(res) {}
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.writeFile = function (p, data, encoding, withRootDir) {
            if (encoding === void 0) {
                encoding = "utf8";
            }
            if (withRootDir === void 0) {
                withRootDir = true;
            }
            return __awaiter(this, void 0, void 0, function () {
                var path;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = p;
                            if (withRootDir) {
                                path = this._fsRoot + p;
                            }
                            return [4, new Promise(function (resolve) {
                                _this._fs.writeFile({
                                    filePath: path,
                                    data: data,
                                    encoding: encoding,
                                    success: function success(res) {
                                        resolve(true);
                                    },
                                    fail: function fail(res) {
                                        console.error(res);
                                        resolve(false);
                                    },
                                    complete: function complete(res) {}
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.access = function (p, withRootDir) {
            if (withRootDir === void 0) {
                withRootDir = true;
            }
            return __awaiter(this, void 0, void 0, function () {
                var path;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = p;
                            if (withRootDir) {
                                path = this._fsRoot + p;
                            }
                            return [4, new Promise(function (resolve) {
                                _this._fs.access({
                                    path: path,
                                    success: function success(res) {
                                        resolve(true);
                                    },
                                    fail: function fail(res) {
                                        resolve(false);
                                    },
                                    complete: function complete(res) {}
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.unlink = function (p, withRootDir) {
            if (withRootDir === void 0) {
                withRootDir = true;
            }
            return __awaiter(this, void 0, void 0, function () {
                var path;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = p;
                            if (withRootDir) {
                                path = this._fsRoot + p;
                                console.log("unlink:--->path:", path);
                            }
                            return [4, new Promise(function (resolve) {
                                _this._fs.unlink({
                                    filePath: path,
                                    success: function success(res) {
                                        console.log("====== unlink success: ", res);
                                        resolve(true);
                                    },
                                    fail: function fail(res) {
                                        console.log("====== unlink fail: ", res);
                                        console.error(res);
                                        resolve(false);
                                    },
                                    complete: function complete(res) {}
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.rmdir = function (dir) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, new Promise(function (resolve) {
                                _this._fs.rmdir({
                                    dirPath: _this._fsRoot + dir,
                                    recursive: true,
                                    success: function success() {
                                        resolve(true);
                                    },
                                    fail: function fail(res) {
                                        console.error(res.errMsg);
                                        resolve(false);
                                    },
                                    complete: function complete() {}
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.deleteCache = function (dir) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, this.rmdir(dir)];
                        case 1:
                            if (_a.sent()) {
                                this._fsCachePathInfo = {};
                                this._dirCache.clear();
                                this._dirty = true;
                            }
                            return [2];
                    }
                });
            });
        };
        WXFileSystem.prototype.unzip = function (p, t) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("zipFilePath:", this._fsRoot + p, "---targetPath:", this._fsRoot + t);
                            return [4, new Promise(function (resolve) {
                                _this._fs.unzip({
                                    zipFilePath: _this._fsRoot + p,
                                    targetPath: _this._fsRoot + t,
                                    success: function success(res) {
                                        resolve(true);
                                    },
                                    fail: function fail(res) {
                                        console.error(res);
                                        resolve(false);
                                    },
                                    complete: function complete(res) {}
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.dirname = function (dir) {
            var arr = dir.split("/");
            arr.pop();
            return arr.join("/");
        };
        WXFileSystem.prototype.mkdir = function (p, withRootDir) {
            if (withRootDir === void 0) {
                withRootDir = true;
            }
            return __awaiter(this, void 0, void 0, function () {
                var promise, path, ret;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promise = this._mkdirPromise.getValue(p);
                            if (!promise) return [3, 2];
                            return [4, promise];
                        case 1:
                            return [2, _a.sent()];
                        case 2:
                            path = p;
                            if (withRootDir) {
                                path = this._fsRoot + p;
                            }
                            ret = new Promise(function (resolve) {
                                _this._fs.mkdir({
                                    dirPath: path,
                                    success: function success(res) {
                                        _this._mkdirPromise.remove(p);
                                        resolve(true);
                                    },
                                    fail: function fail(res) {
                                        console.error(res);
                                        _this._mkdirPromise.remove(p);
                                        resolve(false);
                                    },
                                    complete: function complete(res) {}
                                });
                            });
                            this._mkdirPromise.setValue(p, ret);
                            return [4, ret];
                        case 3:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.mkdirs = function (p, withRootDir) {
            if (withRootDir === void 0) {
                withRootDir = true;
            }
            return __awaiter(this, void 0, void 0, function () {
                var dirs, current, i, dir;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (p == "") {
                                return [2];
                            }
                            return [4, this.dirExists(p)];
                        case 1:
                            if (!!_a.sent()) return [3, 7];
                            dirs = p.split("/");
                            current = "";
                            i = 0;
                            _a.label = 2;
                        case 2:
                            if (!(i < dirs.length)) return [3, 6];
                            dir = dirs[i];
                            current += dir + "/";
                            return [4, this.dirExists(current)];
                        case 3:
                            if (!!_a.sent()) return [3, 5];
                            return [4, this.mkdir(current, withRootDir)];
                        case 4:
                            _a.sent();
                            this._dirCache.setValue(current, true);
                            _a.label = 5;
                        case 5:
                            ++i;
                            return [3, 2];
                        case 6:
                            return [3, 8];
                        case 7:
                            return [2];
                        case 8:
                            return [2];
                    }
                });
            });
        };
        WXFileSystem.prototype._downloadFile = function (url, retryCnt, target, progressCb) {
            return __awaiter(this, void 0, void 0, function () {
                var p, ret;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            p = new Promise(function (resolve, reject) {
                                var options = {
                                    url: url,
                                    success: function success(v) {
                                        if (v.statusCode >= 400) {
                                            if (retryCnt <= 0) {
                                                reject("\u52A0\u8F7D\u5931\u8D25\uFF1A" + url + "[" + v.statusCode + "]");
                                            } else {
                                                resolve(null);
                                            }
                                        } else {
                                            resolve(v);
                                        }
                                    },
                                    fail: function fail(e) {
                                        console.log("_downloadFile fail: ", url, e);
                                        if (retryCnt <= 0) {
                                            var error = new Error(url);
                                            reject(error);
                                        } else {
                                            resolve(null);
                                        }
                                    },
                                    complete: function complete(res) {}
                                };
                                if (target && target != "") {
                                    options["filePath"] = _this._fsRoot + target;
                                }
                                if (Core.DeviceUtils.isQQPlay()) {
                                    var task = qq.downloadFile(options);
                                    if (progressCb) {
                                        task.onProgressUpdate(function (res) {
                                            progressCb(res);
                                        });
                                    }
                                } else {
                                    var task = wx.downloadFile(options);
                                    if (progressCb) {
                                        task.onProgressUpdate(function (res) {
                                            progressCb(res);
                                        });
                                    }
                                }
                            });
                            if (!(retryCnt <= 0)) return [3, 1];
                            throw new Error(url);
                        case 1:
                            return [4, p];
                        case 2:
                            ret = _a.sent();
                            if (!ret) return [3, 3];
                            return [2, ret];
                        case 3:
                            console.debug("download", url, "fail, retry cnt", retryCnt);
                            return [4, this._downloadFile(url, retryCnt - 1, target, progressCb)];
                        case 4:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype.download = function (srcUrl, target, progressCb) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, new Promise(function (resolve, reject) {
                                _this._downloadFile(srcUrl, _this._downloadFailRetryCnt, target, progressCb).catch(function (error) {
                                    reject(error);
                                }).then(function (res) {
                                    resolve(res);
                                }, function (error) {
                                    reject(error);
                                });
                            })];
                        case 1:
                            return [2, _a.sent()];
                    }
                });
            });
        };
        WXFileSystem.prototype._xhrLoad = function (xhrURL, type, isText) {
            return __awaiter(this, void 0, void 0, function () {
                var content;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, new Promise(function (resolve, reject) {
                                var xhr = new XMLHttpRequest();
                                if (type) {
                                    xhr.responseType = type;
                                }
                                xhr.onload = function () {
                                    if (xhr.status >= 400) {
                                        var message = "\u52A0\u8F7D\u5931\u8D25\uFF1A" + xhrURL;
                                        console.error(message);
                                        resolve("");
                                    } else {
                                        if (isText) {
                                            resolve(xhr.responseText);
                                        } else {
                                            resolve(xhr.response);
                                        }
                                    }
                                };
                                xhr.onerror = function () {
                                    var error = new Error(xhrURL);
                                    console.error("xhrLoad error: ", error);
                                    resolve("");
                                };
                                xhr.open("get", xhrURL);
                                xhr.send();
                            })];
                        case 1:
                            content = _a.sent();
                            return [2, content];
                    }
                });
            });
        };
        WXFileSystem.prototype.xhrLoad = function (xhrURL, target, type, isText) {
            return __awaiter(this, void 0, void 0, function () {
                var retryCnt, content, dirname;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            retryCnt = this._downloadFailRetryCnt;
                            _a.label = 1;
                        case 1:
                            if (!(retryCnt-- > 0)) return [3, 7];
                            return [4, this._xhrLoad(xhrURL, type, isText)];
                        case 2:
                            content = _a.sent();
                            if (!(content && content != "")) return [3, 6];
                            if (!(target && target != "")) return [3, 5];
                            dirname = this.dirname(target);
                            return [4, this.mkdirs(dirname)];
                        case 3:
                            _a.sent();
                            return [4, this.writeFile(target, content)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            return [2, content];
                        case 6:
                            console.error("xhrLoad ", xhrURL, "fail, retry ", retryCnt);
                            return [3, 1];
                        case 7:
                            throw new Error(xhrURL);
                    }
                });
            });
        };
        WXFileSystem.prototype.loadRemoteImportZipFile = function (fileName, progressCb) {
            return __awaiter(this, void 0, void 0, function () {
                var url, res, finalRet, res2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = HotUpdate.MiniGameHotUpdateMgr.inst.REMOTE_SERVER_ROOT + fileName;
                            return [4, this.download(url, fileName, progressCb).then(function (res) {
                                return true;
                            }, function (error) {
                                console.log("loadRemoteImportZipFile download error: ", error);
                                return false;
                            }).catch(function (error) {
                                console.log("loadRemoteImportZipFile download exception: ", error);
                                return false;
                            })];
                        case 1:
                            res = _a.sent();
                            if (!res) return [3, 7];
                            finalRet = false;
                            return [4, this.deleteImportJsonCache()];
                        case 2:
                            res2 = _a.sent();
                            if (!res2) return [3, 6];
                            return [4, this.unzip(fileName, "")];
                        case 3:
                            if (!!_a.sent()) return [3, 4];
                            console.error("loadRemoteImportZipFile unzip ", fileName, "fail");
                            return [3, 6];
                        case 4:
                            return [4, this.dirExists("res/import")];
                        case 5:
                            finalRet = _a.sent();
                            console.log("[loadRemoteImportZipFile:]finalRet:", finalRet);
                            _a.label = 6;
                        case 6:
                            this.unlink(fileName);
                            return [2, finalRet];
                        case 7:
                            return [2, false];
                    }
                });
            });
        };
        WXFileSystem.prototype.loadRemoteRawAssetsZipFile = function (fileName, progressCb) {
            return __awaiter(this, void 0, void 0, function () {
                var url, res, finalRet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isNewDownloader) {
                                console.log("WXLoader loadRemoteZipFile not a new loader, skip...");
                                return [2, true];
                            }
                            url = "";
                            return [4, this.download(url, fileName, progressCb).then(function (res) {
                                return true;
                            }, function (error) {
                                console.log("loadRemoteRawAssetsZipFile download error: ", error);
                                return false;
                            }).catch(function (error) {
                                console.log("loadRemoteRawAssetsZipFile download exception: ", error);
                                return false;
                            })];
                        case 1:
                            res = _a.sent();
                            if (!res) return [3, 6];
                            finalRet = false;
                            return [4, this.unzip(fileName, "")];
                        case 2:
                            if (!!_a.sent()) return [3, 3];
                            console.error("loadRemoteRawAssetsZipFile unzip ", fileName, "fail");
                            return [3, 5];
                        case 3:
                            return [4, this.dirExists("res/raw-assets")];
                        case 4:
                            finalRet = _a.sent();
                            console.log("[loadRemoteRawAssetsZipFile:]finalRet:", finalRet);
                            _a.label = 5;
                        case 5:
                            this.unlink(fileName);
                            return [2, finalRet];
                        case 6:
                            return [2, false];
                    }
                });
            });
        };
        WXFileSystem._inst = null;
        return WXFileSystem;
    }();
    WXGame.WXFileSystem = WXFileSystem;
    var non_text_format = ['js', 'png', 'jpg', 'bmp', 'jpeg', 'gif', 'ico', 'tiff', 'webp', 'image', 'pvr', 'etc', 'mp3', 'ogg', 'wav', 'm4a', 'font', 'eot', 'ttf', 'woff', 'svg', 'ttc'];
    var binary_format = ['bin'];
    var REGEX = /^\w+:\/\/.*/;
    var CocosWXDownloader = function () {
        function CocosWXDownloader() {
            this.id = "CocosWXDownloader";
            this.async = true;
            this.pipeline = null;
            this.SUBCONTEXT_ROOT = "";
            console.log("server root: ", CocosWXDownloader.REMOTE_SERVER_ROOT);
        }
        Object.defineProperty(CocosWXDownloader, "inst", {
            get: function get() {
                if (CocosWXDownloader._inst == null) {
                    CocosWXDownloader._inst = new CocosWXDownloader();
                }
                return CocosWXDownloader._inst;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CocosWXDownloader, "REMOTE_SERVER_ROOT", {
            get: function get() {
                return HotUpdate.MiniGameHotUpdateMgr.inst.REMOTE_SERVER_ROOT;
            },
            enumerable: false,
            configurable: true
        });
        CocosWXDownloader.prototype.initHandlers = function () {
            return __awaiter(this, void 0, void 0, function () {
                var pipeBeforeDownloader;
                return __generator(this, function (_a) {
                    pipeBeforeDownloader = window.wxDownloader;
                    cc.loader.insertPipeAfter(pipeBeforeDownloader, this);
                    cc.loader.removePipe(pipeBeforeDownloader);
                    return [2];
                });
            });
        };
        CocosWXDownloader.prototype.nextPipe = function (item, callback) {
            var _this = this;
            console.log("CocosWXDownloader nextPipe", item);
            var queue = cc.LoadingItems.getQueue(item);
            queue.addListener(item.id, function (item) {
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!item.error) return [3, 2];
                                return [4, WXFileSystem.inst.unlink(item.url, false)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                return [2];
                        }
                    });
                });
            }, null);
            callback(null, null);
        };
        CocosWXDownloader.prototype.handle = function (item, callback) {
            console.log("CocosWXDownloader handle ", item);
            if (item.type === "js") {
                callback(null, null);
                return;
            }
            if (item.type === 'uuid') {
                var result = cc.Pipeline.Downloader.PackDownloader.load(item, callback);
                if (result !== undefined) {
                    if (!!result) {
                        return result;
                    } else {
                        return;
                    }
                }
            }
            var filePath = item.url;
            var self = this;
            WXFileSystem.inst.wxFs.access({
                path: filePath,
                success: function success() {
                    if (item.type && non_text_format.indexOf(item.type) !== -1) {
                        self.nextPipe(item, callback);
                    } else {
                        self.readTextFile(item, callback);
                    }
                },
                fail: function fail(res) {
                    self.readFileFromLocal(item, callback);
                },
                complete: function complete(res) {}
            });
        };
        CocosWXDownloader.prototype.readFileFromLocal = function (item, callback) {
            var localPath = WXFileSystem.inst.fsRoot + item.url;
            var fs = WXFileSystem.inst.wxFs;
            var self = this;
            function handleItem(item) {
                item.url = localPath;
                if (item.type && non_text_format.indexOf(item.type) !== -1) {
                    self.nextPipe(item, callback);
                } else {
                    self.readTextFile(item, callback);
                }
            }
            fs.access({
                path: localPath,
                success: function success() {
                    WXFileSystem.inst.setFileLocalPath(item, localPath);
                    handleItem(item);
                },
                fail: function fail(res) {
                    if (!CocosWXDownloader.REMOTE_SERVER_ROOT) {
                        callback(null, null);
                        return;
                    }
                    console.log("CocosWXDownloader try to downloadRemoteFile");
                    self.downloadRemoteFile(item, callback);
                },
                complete: function complete(res) {}
            });
        };
        CocosWXDownloader.prototype.ensureDirFor = function (path, callback) {
            var ensureDir = cc.path.dirname(path);
            if (ensureDir === "wxfile://usr" || ensureDir === "http://usr") {
                callback();
                return;
            }
            var self = this;
            WXFileSystem.inst.wxFs.access({
                path: ensureDir,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    self.ensureDirFor(ensureDir, function () {
                        WXFileSystem.inst.wxFs.mkdir({
                            dirPath: ensureDir,
                            complete: function complete(res) {
                                callback(res);
                            }
                        });
                    });
                },
                complete: function complete(res) {}
            });
        };
        CocosWXDownloader.prototype._downloadFile = function (url, callback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4, WXFileSystem.inst.download(url).then(function (res) {
                                callback(true, res);
                            }, function (error) {
                                callback(false, error);
                            })];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        CocosWXDownloader.prototype.downloadRemoteFile = function (item, callback) {
            var relatUrl = item.url;
            if (REGEX.test(relatUrl)) {
                callback(null, null);
                return;
            }
            var remoteUrl = CocosWXDownloader.REMOTE_SERVER_ROOT + relatUrl;
            item.url = remoteUrl;
            var self = this;
            var fs = WXFileSystem.inst.wxFs;
            this._downloadFile(remoteUrl, function (success, res) {
                if (success) {
                    var temp = res.tempFilePath;
                    var localPath = WXFileSystem.inst.fsRoot + relatUrl;
                    var uuid_1 = WXFileSystem.inst.getItemUuid(item);
                    if (WXGame.uncachedFileUuids.indexOf(uuid_1) < 0) {
                        self.ensureDirFor(localPath, function () {
                            console.log("CocosWXDownloader saving file to ", localPath);
                            fs.saveFile({
                                tempFilePath: res.tempFilePath,
                                filePath: localPath,
                                success: function success(res) {
                                    cc.log('save:' + localPath);
                                    WXFileSystem.inst.setFileLocalPath(item, localPath);
                                    console.log("CocosWXDownloader save file ", res.savedFilePath, "success, uuid = ", uuid_1);
                                    item.url = res.savedFilePath;
                                    if (item.type && non_text_format.indexOf(item.type) !== -1) {
                                        self.nextPipe(item, callback);
                                    } else {
                                        self.readTextFile(item, callback);
                                    }
                                },
                                fail: function fail(res) {
                                    console.log(res && res.errMsg ? res.errMsg : "save file failed: " + remoteUrl);
                                    console.log('It might be due to out of storage spaces, you can clean your storage spaces manually.');
                                    item.url = temp;
                                    if (item.type && non_text_format.indexOf(item.type) !== -1) {
                                        self.nextPipe(item, callback);
                                    } else {
                                        self.readTextFile(item, callback);
                                    }
                                },
                                complete: function complete(res) {}
                            });
                        });
                    } else {
                        item.url = temp;
                        if (item.type && non_text_format.indexOf(item.type) !== -1) {
                            self.nextPipe(item, callback);
                        } else {
                            self.readTextFile(item, callback);
                        }
                    }
                } else {
                    console.error("download file failed: ", remoteUrl, res);
                    callback({
                        status: 0,
                        errorMessage: res && res.errMsg ? res.errMsg : "Download file failed: " + remoteUrl
                    }, null);
                }
            });
        };
        CocosWXDownloader.prototype.readTextFile = function (item, callback) {
            var url = item.url;
            var encodingFormat = 'utf8';
            for (var i = 0; i < binary_format.length; i++) {
                if (url.endsWith(binary_format[i])) {
                    encodingFormat = '';
                    break;
                }
            }
            var fs = WXFileSystem.inst.wxFs;
            fs.readFile({
                filePath: url,
                encoding: encodingFormat,
                success: function success(res) {
                    var queue = cc.LoadingItems.getQueue(item);
                    queue.addListener(item.id, function (item) {
                        if (item.error) {
                            fs.unlink({
                                filePath: url,
                                success: function success() {
                                    cc.log("Load failed, removed local file " + url + " successfully!");
                                }
                            });
                        }
                    }, null);
                    if (res.data) {
                        item.states[cc.loader.downloader.id] = cc.Pipeline.ItemState.COMPLETE;
                        callback(null, res.data);
                    } else {
                        callback({
                            status: 0,
                            errorMessage: "Empty file: " + url
                        });
                    }
                },
                fail: function fail(res) {
                    console.error("CocosWXDownloader read file failed: ", url);
                    fs.unlink({
                        filePath: url,
                        success: function success() {
                            cc.log("Read file failed, removed local file " + url + " successfully!");
                        }
                    });
                    callback({
                        status: 0,
                        errorMessage: res && res.errMsg ? res.errMsg : "Read text file failed: " + url
                    });
                },
                complete: function complete(res) {}
            });
        };
        CocosWXDownloader.initLoaders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var re;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!Core.DeviceUtils.isMiniGame()) return [3, 4];
                            console.log("init wxloaders");
                            return [4, WXFileSystem.inst.initFilePathInfos()];
                        case 1:
                            _a.sent();
                            return [4, CocosWXDownloader.inst.initHandlers()];
                        case 2:
                            _a.sent();
                            return [4, HotUpdate.MiniGameHotUpdateMgr.inst.hotUpdate()];
                        case 3:
                            re = _a.sent();
                            if (re.success) {
                                console.log("游戏启动，热更完毕");
                            } else {
                                console.log("游戏启动，热更失败", re.reason);
                            }
                            _a.label = 4;
                        case 4:
                            return [2];
                    }
                });
            });
        };
        CocosWXDownloader._inst = null;
        return CocosWXDownloader;
    }();
    WXGame.CocosWXDownloader = CocosWXDownloader;
})(WXGame || (WXGame = {}));
var WXGame;
(function (WXGame) {
    WXGame.uncachedFileUuids = ["f5cddcd5-16f9-40a0-b4b7-e570fb5405e1", "b85ef599-1788-4b93-be92-84cd960615be", "f3284e05-35a9-4533-b430-aa6a6897a98e", "1a86d3bb-f215-4cf3-aef5-1b28982a0404", "0259e012-2b83-4624-adaa-2eb9ac5b1e9e", "4b48b426-772e-4006-82cd-47d2c4906b6b", "72114a37-842d-4e2c-88cc-e58f05a7793a", "c4d25164-21b7-4db1-a92d-ab05c3300402", "74188206-5043-45a9-ac76-d74aa7e60683", "931b6810-c010-43ba-a562-0e658bd63b92", "75aef0c7-d552-4797-827c-adecc2768bfa", "f6f8d12d-4581-487c-a830-1310a6725be0", "f170dab1-a258-47c8-9280-5a3c2070f480", "8e00fd5b-1cd1-41ed-85ca-353549f0d16d", "f06747e3-f280-4306-9042-55f29f0e6925", "4922313a-3209-4232-aa24-fcd78db67c76", "1501854f-cf36-4232-97d1-9d5e23b99b8e", "eb342b20-3921-4fcf-9854-4e6f879d944f", "ba215ace-d4dd-4b77-9582-a4f93390aa44", "44286999-642e-41b8-888a-fd8ff3dba61f", "cbb9cf7e-bb7d-4058-b3d9-a60a53ecead8", "d30fee19-fada-46b1-912a-c53fd20193ad", "e97c2729-6f46-4230-9b29-62069e0826c7", "8ffbe702-8441-4caa-a4b2-22fd902495e9", "02c119a2-2ab9-413b-afc8-b760dc41248b", "8c01c28a-bbc8-410a-a8fb-0e7ac4954372", "5a9e4f32-1b9e-4a0a-86db-75dcc1430c06", "f322d2be-1e82-4934-8ecd-138240c7fc74", "38f56094-b76e-4ef9-b1f6-c77849978c4b", "8e3aabb8-8449-449e-96e1-db16b8fbacb4", "66dd8513-e40e-4183-9afb-db051394c75c", "be55be10-45a6-4663-a120-e1dadec10094", "251d5aac-e02e-4797-b467-7c2d8e18761c", "9f5214cd-2e7d-456f-b30d-e1564a44f271", "9ad3e28e-0668-4614-b8d8-567e10398a06", "637f0e18-cf97-4d88-8a06-df740047cb36", "a273a1db-a2ae-43f8-831f-31b3693dc073", "0ca0e53d-ce1e-431e-b5d7-3f9be8c5b114", "0fb9bc71-6337-4a7c-b684-ed215c4cc638", "3d46d797-038c-436b-a210-33545c9b1175", "5d3a97a2-8051-4486-b8b8-302c04e37454", "b2d8ef02-d5ae-422b-8518-ababd3857128", "1ed60ad8-a306-4b73-b24c-25075df68360", "35171aba-d9ed-4e79-8a3d-857057f38320", "76dde138-0584-45fc-956c-78f81f165861", "aa14eb65-0fe8-4dde-bae4-e5201c3b4a03", "f920f900-e5f0-4972-823f-23eb0ecb5c52", "3ee8f7c1-152d-49e1-b348-826d09f1f56a", "8187523e-7972-48f7-967f-8677f012915a", "04d6e53e-3775-4637-98f0-35b1d19e53c1", "21c0f5dd-1208-47c9-b9ac-0437e33f3864", "85cc910e-2243-4dbe-b1d8-ef77f2822a4e", "7325daaf-76a2-469e-b567-9867f6aa6eed", "2bac10ce-b4ae-40fc-9e5b-b48e8be33a02", "5c35e934-422a-4707-b85c-5a9683040545", "ef4ca0e4-578e-46f6-a5c2-16c0e5a0b2cc", "5141b652-afa2-4d66-826c-3294bf1c799e", "43488edc-5cd4-42ee-b34c-5061e9498e5b", "13951026-0673-437a-969f-11ec8b6b7b0c", "ed20c50c-989c-4cdd-8f9d-d3579cb640dc", "46789dac-1d1b-4de8-a773-82ada87afaed", "b4ee3eb3-b213-4b9e-8fd9-95467d6c9bde", "b77a314b-cd2f-4e50-8a3b-2df5992e6f93", "63483971-8ea1-48ac-9137-e371795db272", "d94a7809-e0c6-44c5-b43b-99ba699747c6", "31af2c03-100e-47ad-af60-9d7dd9a3caf8", "4bbbee02-ea0d-4ab2-909c-7ea8891d0162", "6f3bfe22-2b9a-48a9-944a-5abbaf961086", "e6a1922b-28f9-4c37-b730-c97bc976c038", "59196346-b101-45c7-a8ba-ae3ee91d4a0e", "eb8bbdaf-a718-439b-95a1-37e02aa74a94", "37796d8a-cf6f-4292-a839-6ac0f71549a1", "fd503771-3a66-4b21-b2ee-746331b5b838", "f7190462-a77c-4e30-a1b1-35f78527e504", "b9edb719-f797-42a8-8dc8-7e0901710116", "7cc76b4d-e289-4f16-b857-017369f7fc01", "5a7ab32d-7d03-4984-9416-568d9fcf738a", "17dcd596-d8ad-4969-be29-dbb3e25b6ba9", "0574241d-7e77-4435-9692-2af7e755ab6a", "042ee552-542b-4881-8163-a8fc01aef8f0", "2a1d4972-0d29-4aa8-bd2c-514a1f4d79a8", "3a5eb2d7-68aa-4c44-98ab-142546cac075", "63c5bbcf-8107-4777-8f7a-e946a5e4d7fb", "828dbfe6-0bff-4f96-bab3-7a51fadece5d", "261fc82b-2d4e-4494-af31-30199483f35a", "eb4638ad-0182-417f-b712-84c2f46f663e", "8cf0d6d8-d543-49db-a86a-e45aaf7cb9c7", "8269a29f-e976-4bfe-b828-2f5a10a0a660", "02b1fa98-c916-4a65-9841-b22d8997ca83", "8fea02d1-0d2b-43c1-a5a3-15ede58be204", "c49512b4-f6c1-47d4-bb5a-b1c7b18bb75a", "dd9b4113-2ef9-4597-97ee-307e59599f31", "962c1f5e-18fe-43a8-b272-7203630f7b1c", "618602f4-1ea7-44cc-91a4-bef91cddd37c", "0b774234-34f8-4d6e-b4fe-fc3e25f849e9", "9d685a43-0fb9-444f-ad48-27a4ce754227", "517458a8-c567-4c03-8a2b-2c6e877674da", "af2c381c-4daf-4a48-9a75-4d12627477d5", "bfcc5049-3a95-47b3-a5d7-51c9e6bd197f", "35ca1ab0-49c4-40e3-aa63-1b0c877a7b68", "6b945690-25a3-4c8a-af0b-59ef96b30328", "a94a4ff6-41d0-4546-a67d-d471d124c63f", "2f0d5271-0d0f-4034-bd2a-3e450cbcbbae", "4957f4ea-3317-447c-9cd5-33b0a2a7793d", "01f4ff60-28c1-485e-b414-6378fdb662d9", "3f645d68-1453-49c3-b8e5-ef5af72acd46", "3cd2d71e-b52b-4bbe-80f4-5eda3d3b4c23", "b2ed3f9b-b602-4311-8eb9-848a9ad12f82", "5d0e22ce-fbe3-46b2-b804-4e24146c339e", "5bd10736-42c4-47ad-a1a8-056d3edcb733", "00c62067-2412-40f0-9713-e858cdea1e1c", "3aff25ff-8072-44cd-8261-ead057143dbc", "28e27ff4-5599-41f8-aa77-1795c2178936", "11dd2025-ffa9-4d1d-91a4-27d897c72d89", "e01b441e-4374-41b2-ac70-e50a5693b0ad", "7fe85859-e923-4897-9076-13fb368807c4", "c78e9001-808d-4f33-b3de-6d86bbe2fde4", "376e7ec0-ac47-471d-95b3-3ab5cf75194e", "860cd3eb-d711-4c32-98a8-b6581acabb66", "0a0cb3b6-156f-464c-9933-07bc8d273681", "c8a7fb6f-9ffe-4d47-9da5-663e17b6b996", "10cec23d-716e-4e99-a42a-9e5d5b566523", "3f062842-c860-4012-b7d3-82ebed7670bf", "4d48ffe8-1fc2-44d1-b7f1-ec3178954f3d", "cb8a0af1-e16b-428f-81d8-49dab0f32f7b", "faf42046-7047-4328-97bd-02460bb0d550", "8886553b-3043-468c-8927-1fdda8350d61", "eaf877e9-6624-4e84-abb5-c46571f80c1d", "b742403d-844d-4a78-ba73-eb0212fcd3d4", "62dd4fb5-4562-4d4f-9137-6cceade4c7a0"];
})(WXGame || (WXGame = {}));

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameLogic.js.map
        