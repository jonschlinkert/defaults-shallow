'use strict';

require('mocha');
require('should');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var defaults = require('./');

if (argv && argv.lib) {
  defaults = require(path.resolve('benchmark/code', argv.lib));
}

describe('defaults', function () {
  it('should extend the first object with the properties of the other objects.', function () {
    defaults({a: 'b'}, {c: 'd'}).should.eql({a: 'b', c: 'd'});
    defaults({a: 'b', c: 'd'}, {c: 'e'}).should.eql({a: 'b', c: 'd'});
  });

  it('should not overwrite existing values.', function () {
    defaults({a: 'b'}, {a: 'c'}).should.eql({a: 'b'});
  });

  it('should skip over non-plain objects.', function () {
    defaults({a: 'b'}, 'foo', {c: 'd'}).should.eql({a: 'b', c: 'd'});
    defaults({a: 'b'}, null, {c: 'd'}).should.eql({a: 'b', c: 'd'});
    defaults({a: 'b'}, new Date(), {c: 'd'}).should.eql({a: 'b', c: 'd'});
    defaults({a: 'b', c: 'd'}, 'bar', {c: 'e'}).should.eql({a: 'b', c: 'd'});
  });

  it('should extend a regex.', function () {
    var fixture = /foo/;
    defaults(fixture, {a: 'b'}, new Date(), {c: 'd'});
    fixture.a.should.equal('b');
    fixture.c.should.equal('d');
  });

  it('should extend a function.', function () {
    var fixture = function() {};
    defaults(fixture, {a: 'b'}, new Date(), {c: 'd'});
    fixture.a.should.equal('b');
    fixture.c.should.equal('d');
  });

  it('should extend an array.', function () {
    var arr = [];
    defaults(arr, {a: 'b'}, new Date(), {c: 'd'});
    arr.a.should.equal('b');
    arr.c.should.equal('d');
  });

  it('should return an empty object when args are undefined.', function () {
    defaults(null).should.eql({});
    defaults(undefined).should.eql({});
  });

  it('should extend object a with object b:', function () {
    defaults({a: {b: 'b'}}, {b: {c: 'c'}}).should.eql({a: {b: 'b'}, b: {c: 'c'}});
  });

  it('should return an empty object when args are undefined:', function () {
    defaults().should.eql({});
  });
});
