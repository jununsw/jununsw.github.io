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