"use strict";
function deepComp(a, b) {
  if (typeof a !== typeof b) return false;
  if (
    typeof a == "number" &&
    isNaN(a) &&
    isNaN(b)
  )
    return true;
  if (a == null || b == null)
    return a === b;
  if (
    (a instanceof Array && !(b instanceof Array)) ||
    (b instanceof Array && !(a instanceof Array))
  )
    return false;
  if (a instanceof Array) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (deepComp(a[i], b[i]) == false) return false;
    }
    return true;
  }
  if (typeof a == "object" && typeof b == "object") {
    var aLength = countElem(a);
    var bLength = countElem(b);
    if (aLength != bLength) {
      return false;
    }
    function countElem(object) {
      var count = 0;
      for (var key in object) {
        count++;
      }
      return count;
    }
    for (var key in a) {
      if (!(key in b)) {
        return false;
      }
      if (deepComp(a[key], b[key]) != true) return false;
    }
    return true;
  }

  return a == b;
}

function test(H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, A1, A2, A3) {
  var testSet = [
    [H1, H2, true],
    [H1, H3, false],
    [H1, H4, false],
    [H1, H5, false],
    [H6, H7, true],
    [H8, H9, false],
    [H8, H10, false],
    [null, H10, false],
    [H10, null, false],
    [null, null, true],
    [null, undefined, false],
    [5, "5", false],
    [5, H1, false],
    [A1, H1, false],
    [A2, A3, false],
    [{ a: 5, b: undefined }, { a: 5, c: undefined }, false],
    [[5, 7], { 0: 5, 1: 7 }, false],
    [[5, 7], { 0: 5, 1: 7, length: 2 }, false],
    ["aaa", "bbb", false],
    [Number.NaN, Number.NaN, true],
    [[5, 7], { 5: 7 }, false],
    [[5, 7], 57, false],
    [57, { 5: 7 }, false],
    [NaN, undefined, false],
    [[1, 2, 3], [1, 3, 2], false],
    [Number.NaN, "NaN", false],
    [{ "a:b": "c" }, { a: "b:c" }, false],
    [{ a: 2 }, { a: 2, b: 3 }, false],
    [undefined, undefined, true],
    [[[2, 5]], [[2, 5]], true],
    [null, {}, false],
  ];
  var countPassed = 0;
  var countFailed = 0;
  for (var unit of testSet) {
    if (deepComp(unit[0], unit[1]) == unit[2]) {
      countPassed++;
    } else countFailed++;
  }
  console.log(
    `Успешно пройдено: ${countPassed} тест\nНе пройдено: ${countFailed} тестов`
  );
}

var H1 = { a: 5, b: { b1: 6, b2: 7 } };
var H2 = { b: { b1: 6, b2: 7 }, a: 5 };
var H3 = { a: 5, b: { b1: 6 } };
var H4 = { a: 5, b: { b1: 66, b2: 7 } };
var H5 = { a: 5, b: { b1: 6, b2: 7, b3: 8 } };
var H6 = { a: null, b: undefined, c: Number.NaN };
var H7 = { c: Number.NaN, b: undefined, a: null };
var H8 = { a: 5, b: 6 };
var H9 = { c: 5, d: 6 };
var H10 = { a: 5 };
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];
test(H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, A1, A2, A3);






/*function deepComp(a, b) {
  if (typeof a !== typeof b) {
    return false;
  } else if (
    typeof a == "number" &&
    typeof b == "number" &&
    isNaN(a) &&
    isNaN(b)
  ) {
    return true;
  } else if (
    (a instanceof Array && !(b instanceof Array)) ||
    (b instanceof Array && !(a instanceof Array))
  ) {
    return false;
  } else {
    a = makeString(a);
    b = makeString(b);
    return (a == b);
  }
  function makeString(object) {
    var string;
    if (!(object instanceof Object)) {
      return object;
    }
    if (object instanceof Array) {
      string = "";
      for (var elem of object) {
        string += makeString(elem);
      }
    } else {
      string = "";
      for (var key in object) {
        string += key + makeString(object[key]);
      }
    }
    return sortString(string);
  }
  function sortString(string) {
    var newArray = string.split("").sort();
    var newString = newArray.reduce((r, v, i, a) => r + v, 0);
    return newString;
  }
}




 else if (typeof a == 'object' && typeof b == 'object') {
    for (var key in a) {
      if (!(key in b)) {
        return false;
      }
    }
    a = makeArray(a);
    b = makeArray(b);
    function makeArray(object) {
      var Array = [];
      for (var key in object) {
        if (typeof object[key] == "object") {
          object[key] = makeArray(object[key]);
        }
        Array.push(key + ":" + object[key]);
      }
      return Array;
    }
    return deepComp(a, b);
  } 

*/