"use strict";
exports.__esModule = true;
var index_1 = require("./index");
exports.test = function (cmp) {
    var tests = 0;
    var failed = 0;
    var throws = function (a, b, final) {
        tests++;
        try {
            var val = cmp(a, b);
            console.error('comparison should have failed: ', a, b, ' instead, returned ', val);
            failed++;
        }
        catch (e) {
            // console.log('comparison correctly failed:', a, b);
            // tslint:disable-next-line:no-empty
        }
        if (!final && a !== b) {
            throws(b, a, true);
        }
    };
    var map = new Map();
    map.set(-1, '<');
    map.set(0, '=');
    map.set(1, '>');
    var invert = { '=': '=', '<': '>', '>': '<' };
    var expect = function (a, exp, b, final) {
        tests++;
        try {
            var val = cmp(a, b);
            if (map.has(val)) {
                if (map.get(val) !== exp) {
                    console.error('comparison of ', a, b, ' should have returned ', exp, ' got ', val);
                    failed++;
                }
                else {
                    // tslint:disable-next-line:no-empty
                    // console.log('comparison of ', a, b, ' correctly returned ', val);
                }
            }
            else {
                console.error('comparison of ', a, b, ' returned a non-standard value ', val);
                failed++;
            }
        }
        catch (e) {
            console.error('comparison of ', a, b, 'failed with exception ', e);
            failed++;
        }
        if (!final && a !== b) {
            expect(b, invert[exp], a, true);
        }
    };
    // null is smaller than anything
    expect(null, '=', null);
    expect(null, '<', 0);
    expect(null, '<', 1);
    expect(null, '<', -Infinity);
    expect(null, '<', Infinity);
    expect(null, '<', NaN);
    expect(null, '<', true);
    expect(null, '<', '');
    expect(null, '<', 'null');
    expect(null, '<', []);
    expect(null, '<', [null]);
    expect(null, '<', [1]);
    expect(null, '<', ['abc']);
    // different types throw
    throws(true, 'true');
    throws(true, '');
    throws(true, 1);
    throws(false, 'false');
    throws(false, '');
    throws(false, 0);
    throws(0, '0');
    throws(0, '');
    throws('1', 1);
    throws('NaN', NaN);
    throws(0, {});
    throws(false, [false]);
    throws(false, []);
    throws(true, [true]);
    throws(0, []);
    throws('', []);
    throws(undefined, 0);
    //throws(null, {});
    //throws(null, undefined);
    throws([1], ['1']);
    // NaNs are smaller than other numbers
    expect(NaN, '=', NaN);
    expect(NaN, '<', 0);
    expect(NaN, '<', 1);
    expect(NaN, '<', -1);
    expect(NaN, '<', Infinity);
    expect(NaN, '<', -Infinity);
    // numbers are ordered correctly
    expect(0, '=', 0);
    expect(0, '=', -0);
    expect(1, '=', 1);
    expect(-1, '=', -1);
    expect(Infinity, '=', Infinity);
    expect(-Infinity, '=', -Infinity);
    expect(0, '<', 1);
    expect(-1, '<', 0);
    expect(-1, '<', 0);
    expect(1, '<', 2);
    expect(-2, '<', 1);
    expect(-Infinity, '<', Infinity);
    expect(-Infinity, '<', 0);
    expect(-Infinity, '<', 1);
    expect(-Infinity, '<', -1);
    expect(0, '<', Infinity);
    expect(1, '<', Infinity);
    expect(-1, '<', Infinity);
    // strings are ordered lexographically
    expect('', '=', '');
    expect('a', '=', 'a');
    expect('', '<', 'a');
    expect('a', '<', 'aa');
    expect('a', '<', 'b');
    expect('aa', '<', 'ab');
    expect('aaa', '<', 'aba');
    // arrays are ordered lexographically
    expect([], '=', []);
    expect([], '<', [1]);
    expect([1], '=', [1]);
    expect([1], '<', [2]);
    expect([1], '<', [1, 2]);
    expect([1, 2], '=', [1, 2]);
    expect([1, '1', 3], '<', [1, '1,2']);
    expect([1, 1, 1], '<', [1, 2, 1]);
    // test reverse values
    expect({ reverse: 'a' }, '=', { reverse: 'a' });
    expect({ reverse: 'a' }, '>', { reverse: 'b' });
    expect({ reverse: 0 }, '=', { reverse: 0 });
    expect({ reverse: 0 }, '>', { reverse: 1 });
    expect({ reverse: [1] }, '=', { reverse: [1] });
    expect({ reverse: [1, 1] }, '>', { reverse: [1, 2] });
    console.log('tests ran', tests);
    console.log('tests failed', failed);
    return { ran: exports.test, failed: failed };
};
if (typeof process !== 'undefined' && process.argv[2] === '--run') {
    var result = exports.test(index_1.cmp);
    if (result.failed > 0) {
        process.exit(1);
    }
}
