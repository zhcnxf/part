# part [![Build Status](https://secure.travis-ci.org/zhcnxf/part.png?branch=master)](http://travis-ci.org/zhcnxf/part)

A json partial selector

## Install
Install the module with: `npm install https://github.com/zhcnxf/part/tarball/0.1.0-snapshot`, or in `package.json` add a dependency:

```json
"dependencies": {
    "part": "https://github.com/zhcnxf/part/tarball/0.1.0-snapshot"
}
```
## Usage
```javascript
require("part");

var song = {
    id : 12,
    author : "Liang Hong Zhi",
    poetry : {
	    id : 43,
	    pai : "Shui Diao Ge Tou",
	    poet : "Su shi"
    }
};

var partial = song.partial("author,poetry(poet,pai)");

console.log(partial);
```
output:

    { author: 'Liang Hong Zhi',    
      poetry: { poet: 'Su shi', pai: 'Shui Diao Ge Tou' } }

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 zhcnxf    
Licensed under the Apache License, Version 2.0
