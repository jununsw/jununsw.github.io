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

function num(txt) {
    let str = txt.trim();
    return str == '' ? NaN : Number(txt);
}

function isEqual() {
    if (arguments.length != 3) {
        return false;
    } else {
        if (isNaN(arguments[1])) {
            return false;
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
}

function isPrecise(input, answer, exponential) {
    // i.e. input = 1.234e10, answer = 1.233e10, exponential = 3
    
    if (isNaN(answer)) {
        return false;
    }

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

Number.prototype.t = function() {
    if (arguments.length < 2) {
        return false;
    } else {
        let tol = arguments[1];
        let val = arguments[0];
        let diff = Math.abs(this - val);
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

String.prototype.toNum = function() {
    if (this.trim() == "") {
        return NaN;
    } else {
        return Number(this);
    }
}

String.prototype.searchNum = function() {
    let pattern = RegExp('[0123456789eE\.\+\-]+','g');
    let fetch = pattern.exec(this);
    if (fetch) {
        return Number(fetch[0]);
    } else {
        return NaN;
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

function disableKeyboard() {
    document.onkeydown = function(e) {
        if ((e.shiftKey) || (e.ctrlKey) || (e.altKey)) {
            return false;
        } else {
        
        }
        
        // alphabet
        if ((e.KeyCode >= 65) && (e.KeyCode <= 90)) {
            return false;
        }
        
        // tab
        if (e.keyCode == 9) {
            return false;
        }
        
        // space
        if (e.keyCode == 32) {
            return false;
        }
        
        // comma
        if (e.keyCode == 188) {
            return false;
        }
        
        // dash
        if (e.keyCode == 191) {
            return false;
        }
        
        // divide
        if (e.keyCode == 111) {
            return false;
        }
    }
    
    $("html").on("contextmenu", function(e) {
        return false;
    });
}

function onlyText() {
    document.onkeydown = function(e) {
        if ((e.ctrlKey) || (e.altKey)) {
            return false;
        } else {
        
        }
        
        // tab
        if (e.keyCode == 9) {
            return false;
        }
        
        // enter
        if (e.keyCode == 13) {
            return false;
        }
    }
    
    $("html").on("contextmenu", function(e) {
        return false;
    });
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

function toPost(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
