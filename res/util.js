function getPrecision(input, prec, type) {
	/*
		input: numbers in string type,
		return type: number
	*/
	if (input === "") {
		return NaN;
	}

	if (type === "n") {
		var num1 = Number(input);
		var num2 = num1.toFixed(prec);
		var num3 = Number(num2);
		return num3;
	} else if (type === "e") {
		var num1 = Number(input);
		var num2 = num1.toExponential(prec);
		var num3 = Number(num2);
		return num3;
	}
}

function isEqual() {
    if (arguments.length != 3) {
        return false
    } else {
        var tol = Math.pow(10, -arguments[2]) * 2;
        var diff = Math.abs(arguments[0] - arguments[1]);
        if (diff <= tol) {
            return true;
        } else {
            return false;
        }
    }
}

function isPrecise(input, answer, exponential) {
    // i.e. input = 1.234e10, answer = 1.233e10, exponential = 3

    // obtain answer's exponential value
    if (answer == 0) {
        var tol = 2 * Math.pow(10, -exponential);
        var diff = Math.abs(input);

        if (diff <= tol) {
            return true;
        } else {
            return false;
        }
    } else {
        // obtain answer's exponential value
        var e = Math.floor(Math.log(Math.abs(answer)) / Math.log(10));
        var tol = 2 * Math.pow(10, -exponential) * Math.pow(10, e);
        var diff = Math.abs(input - answer);

        if (diff <= tol) {
            return true;
        } else {
            return false;
        }
    }
}

Array.prototype.random = function() {
    if (arguments.length >= 1) {
        var n = arguments[0];
        var diff = this[1] - this[0];
        var r = this[0] + Math.random()*diff;

        return Number(r.toFixed(n));
    } else {
        return this[Math.random() * this.length >> 1];
    }
}

function disableInspect(path) {
    document.onkeydown = function(e) {
        if (event.keyCode == 123) {
            (new Audio(path)).play();
            return false;
        }
        
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            (new Audio(path)).play();
            return false;
        }
        
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            (new Audio(path)).play();
            return false;
        }
        
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            (new Audio(path)).play();
            return false;
        }

        if (e.ctrlKey && e.keyCode == 'C'.charCodeAt(0)) {
            (new Audio(path)).play();
            return false;
        }

        if (e.ctrlKey && e.keyCode == 'V'.charCodeAt(0)) {
            (new Audio(path)).play();
            return false;
        }

        if (e.ctrlKey && e.keyCode == 'X'.charCodeAt(0)) {
            (new Audio(path)).play();
            return false;
        }
    }
    
    $("html").on("contextmenu", function(e) {
        (new Audio(path)).play();
        return false;
    });
}

function scoreEncode(score) {
    var s = (Number(score)).toFixed(0);

    if (isFinite(Number(s))) {

    } else {
        s = "99";
    }

    var pool = "1234567890";
    var head = "";
    var tail = "";

    for (var i = 0; i < 5; i++) {
        head += pool[Math.random() * pool.length >> 0];
    }

    var r = head + s;

    for (var i = 0; i < 5; i++) {
        tail += pool[Math.random() * pool.length >> 0];
    }

    r += tail;

    return r;
}

function twoScoreEncode(score, addtional) {
    var s = (Number(score)).toFixed(0);
    var a = (Number(addtional)).toFixed(0);

    if (isFinite(Number(s))) {

    } else {
        s = "99";
    }

    if (isFinite(Number(a))) {

    } else {
        a = "99";
    }

    var pool = "1234567890";
    var head = "";
    var middle = "";
    var tail = "";

    for (var i = 0; i < 3; i++) {
        head += pool[Math.random() * pool.length >> 0];
    }

    var r = head + s;

    for (var i = 0; i < 3; i++) {
        middle += pool[Math.random() * pool.length >> 0];
    }

    var r = r + middle + a;

    for (var i = 0; i < 3; i++) {
        tail += pool[Math.random() * pool.length >> 0];
    }

    r += tail;

    return r;
}

function shuffle(original_arr) {
    var arr = original_arr.slice();
    var currentIndex = arr.length;
    var temporaryValue;
    var randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

function selfShuffle(arr) {
    var currentIndex = arr.length;
    var temporaryValue;
    var randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

function array1toN(n) {
    var arr = [];

    for (var i = 1; i <= n; i++) {
       arr.push(i);
    }

    return arr;
}
