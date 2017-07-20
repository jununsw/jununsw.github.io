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