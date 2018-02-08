function fromArray(arr) { // [Int] -> Int
    var item = arr[Math.random() * arr.length >> 0];
    return item;
}

function isEqual(a, b) { // Float -> Float -> Bool
    if (isNaN(a)) {
        return false;
    }
    if (b == 0) {
        if (Math.abs(a) < 0.02) {
            return true;
        } else {
            return false;
        }
    } else {
        var diff = Math.abs(b - a);
        if (diff < 0.02) {
            return true;
        } else {
            return false;
        }
    }
}

function isEqualp(a, b) { // Float -> Float -> Bool
    if (isNaN(a)) {
        return false;
    }
    var a1 = a.toExponential(3);
    var a2 = b.toExponential(3);
    if (a1 == a2) {
        return true;
    } else {
        return false;
    }
}

/*
 * Random value for problem 1
 */

var barlength = 5;

var barlenpool = [1, 2, 3];
var wirelenpool = [2, 3, 4];
var locationpool = [0.5, 0.8, 1];
var forcepool = [60, 80, 100];

var b1 = fromArray(barlenpool);
var b2 = barlength - b1;
var w1 = fromArray(wirelenpool);
var w2 = fromArray(wirelenpool);
var w3 = fromArray(wirelenpool);
var x1 = fromArray(locationpool);

var prob1 = {
    "bar": [b1, b2],
    "wire": [w1, w2, w3],
    "location": x1,
    "force": fromArray(forcepool)
};

/*
 * Random value for problem 2
 */

var lengthpool = [1, 1.2, 1.5, 1.8];
var axialpool = [40, 50, 60];

var l1 = fromArray(lengthpool);
var l2 = fromArray(lengthpool);
var l3 = fromArray(lengthpool);
var a1 = fromArray(axialpool);
var a2 = fromArray(axialpool);
var a3 = fromArray(axialpool);

var prob2 = {
    "length": [l1, l2, l3],
    "force": [a1, a2, a3]
};

/*
 * Code for Angular
 */

var app = angular.module("module03", []);

app.controller("Question01", function($scope) {
    $scope.p = prob1;
})
.controller("Question02", function($scope) {
    $scope.p = prob2;
});