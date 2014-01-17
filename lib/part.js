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

"use strict";

exports.parse = parse;

Object.prototype.partial = function(selector, clone) {
    selector = parse(selector);
    var result = {};
    for (var i = 0; i < selector.length; i++) {
        if (typeof(this[selector[i]]) !== "undefined") {
            result[selector[i]] = clone ? __clone(this[selector[i]]) : this[selector[i]];
        }
    }
    for (i in selector) {
        if (typeof(this[i]) === "object") {
            result[i] = this[i].partial(selector[i]);
        }
    }
    return result;
};

Array.prototype.partial = function(selector) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(this[i].partial(selector));
    }
    return result;
};

function parse(selector) {
    if (selector instanceof Array) {
        return selector;
    }
    
    var word = "", stack = [], scope;
    stack.unshift(scope = []);

    for (var i = 0; i < selector.length; i++) {
        var c = selector[i];
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
            scope[word] = [];
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
            scope[word] = [];
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
