/*
 * Copyright 2014 zhcnxf
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function Sel(sel) {
    var a = [];
    Object.defineProperty(a, 'constructor', { value: arguments.callee });
    a.__proto__ = arguments.callee.prototype;
    
    if (typeof sel !== 'undefined') {
        parse(sel + '', a);    
    }

    return a;
}

Sel.prototype = [];

Sel.prototype.toString = function() {
    var s = [];
    for (var i in this) {
        var v = this[i];
        if (v instanceof Sel) {
            s.push(v + "(" + v.toString() + ')');
        } else {
            s.push(v);
        }
    }
    return s.join(',');
}


Object.prototype.part = function(sel, clone) {
    if (!sel instanceof Sel) {
        sel = new Sel(sel);
    }

    var result = {};
    for (var i = 0, k; i < sel.length; i++) {
        if (typeof(this[k]) !== "undefined") {
            result[k] = clone ? __clone(this[k]) : this[k];
        }
    }

    for (i in sel) {
        if (typeof(this[i]) === "object") {
            result[i] = this[i].part(sel[i]);
        }
    }
    return result;
};

Array.prototype.sel = function(sel) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(this[i].part(sel));
    }
    return result;
};

function parse(sel, stack) {
    sel = new Sel();

    var word = "", scope;

    if (typeof stack === 'undefined') {
        stack = new Sel();
    }

    stack.unshift(scope = new Sel());

    for (var i = 0; i < sel.length; i++) {
        var c = sel[i];
        switch(c) {
        case ".":
            onPathIn(word);
            word = "";
            break;
        case ",":
            onPathOut(word);
            word = "";
            break;
        case "(":
            onScopeIn(word);
            word = "";
            break;
        case ")":
            onScopeOut(word);
            word = "";
            break;
        default:
            word += c;
            break;
        }
    }
    onPathOut(word);
    
    function onPathIn(word) {
        if (!scope[word]) {
            scope[word] = new Sel();
        }
        scope = scope[word];
    }
    
    function onPathOut() {
        if (word && !__contains(scope, word)) {
            scope.push(word);
        }
        scope = stack[0];
    }

    function onScopeIn(word) {
        if (word && !scope[word]) {
            scope[word] = new Sel();
        }
        scope = word ? scope[word] : scope;
        stack.unshift(scope);
    }
    
    function onScopeOut() {
        if (word && !__contains(scope, word)) {
            scope.push(word);
        }
        stack.shift();
        scope = stack[0];
    }
    
    return stack.shift();
}


function __contains(arr, ele) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === ele) {
            return true;
        }
    }
    return false;
}

function __clone(object) {
    // Not implemented yet
    return object;
}

exports.Sel = Sel;

