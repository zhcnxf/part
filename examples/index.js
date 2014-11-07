require("../");

var song = {
	id : 12,
	author : "Liang Hong Zhi",
	poetry : {
		id : 43,
		pai : "Shui Diao Ge Tou",
		poet : "Su shi"
	}
};


var part = song.part("author,poetry(poet,pai)");

console.log(part);

