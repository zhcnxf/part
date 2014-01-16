/*
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

"use strict";

var part = require("../lib/part.js");

exports["Test parse"] = function(test) {
	var selector = "id,performer,song(poetry.id,poetry.poet),music";
	var expected = [ "id", "performer", "music" ];
	expected.song = [];
	expected.song.poetry = [ "id", "poet" ];

	test.ok(part.parse, "parse is not defined");
	test.equal(part.parse.constructor, Function, "parse is not a function");
	test.deepEqual(part.parse(selector), expected, "surprise!");
	test.done();
};

exports["Test object.partial"] = {
	setUp : function(done) {
		this.selector = "id,performer,song(poetry.id,poetry.poet),music";
		this.parsed = part.parse(this.selector);
		this.object = {
			id : 1,
			performer : "Faye Wang",
			song : {
				id : 12,
				author : "Liang Hong Zhi",
				poetry : {
					id : 43,
					pai : "Shui Diao Ge Tou",
					poet : "Su shi"
				}
			},
			music : {
				id : 23,
				editor : "Sunshine",
				images : [ "http://img.shicisong.com/music/23/0.png",
						"http://img.shicisong.com/music/23/1.png" ]
			}
		};
		this.expected = {
			id : 1,
			performer : "Faye Wang",
			music : {
				id : 23,
				editor : "Sunshine",
				images : [ "http://img.shicisong.com/music/23/0.png",
						"http://img.shicisong.com/music/23/1.png" ]
			},
			song : {
				poetry : {
					id : 43,
					poet : "Su shi"
				}
			}
		};
		done();
	},
	tearDown : function(done) {
		delete this.selector;
		delete this.parsed;
		delete this.object;
		delete this.expected;
		done();
	},
	"partial extension" : function(test) {
		test.ok(this.object.partial, "partial is not defined");
		test.equal(this.object.partial.constructor, Function, "partial is not a function");
		test.done();
	},
	"partial(selector)" : function(test) {
		test.deepEqual(this.object.partial(this.selector), this.expected,
				"surprise!");
		test.done();
	},
	"partial(parsed)" : function(test) {
		test.deepEqual(this.object.partial(this.parsed), this.expected, "surprise!");
		test.done();
	}
};

exports["Test array.partial"] = {
	setUp : function(done) {
	    this.selector = "name";
		this.parsed = part.parse(this.selector);
        this.array = [ {id: 1, name: "Jame Green"},
	            {id: 2, name: "Kate Green"},
	            {id: 3, name: "Mis Green"},
	            {id: 4, name: "Mr Green"} ];
        this.expected = [ { name: "Jame Green" },
                { name: "Kate Green" },
                { name: "Mis Green" },
                { name: "Mr Green" } ];
		done();
	},
	tearDown : function(done) {
		delete this.selector;
		delete this.parsed;
		delete this.array;
		delete this.expected;
		done();
	},
	"partial extension" : function(test) {
		test.ok(this.array.partial, "partial is not defined");
		test.equal(this.array.partial.constructor, Function, "partial is not a function");
		test.done();
	},
	"partial(selector)" : function(test) {
		test.deepEqual(this.array.partial(this.selector), this.expected,
				"surprise!");
		test.done();
	},
	"partial(parsed)" : function(test) {
		test.deepEqual(this.array.partial(this.parsed), this.expected,
				"surprise!");
		test.done();
	}
};

