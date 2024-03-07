const result = document.querySelector('#result');
const expression = document.querySelector('#expression');
const num = document.querySelectorAll('.number:not(.equals)');
const operation = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const ce = document.querySelector('#ce');

let ex = '';
result.innerHTML = '0';

function clickN() {
    if (!ex || typeof (ex) === 'number' || ex === '0') {
        expression.innerHTML = this.id;
        ex = this.id;
    } else {
        expression.innerHTML += this.id;
        ex += this.id;
    }
    result.innerHTML = ex.split(/\/|\*|\+|-|=/).pop();
    checkLength(result.innerHTML);
};

function clickO() {
    if (!ex) {
        return;
    }
    ex = ex.toString().replace(/=/, '');
    if (ex.match(/\/|\*|\+|-|=/)) {
        ex = eval(ex).toString();
    }
    expression.innerHTML = expression.innerHTML.replace(/=/, '') + this.id;
    ex += this.id;
    result.innerHTML = this.id;
};

Array.from(num).forEach(function (element) {
    element.addEventListener('click', clickN);
});

Array.from(operation).forEach(function (element) {
    element.addEventListener('click', clickO);
});

clear.addEventListener('click', () => {
    result.innerHTML = '';
    expression.innerHTML = '';
    ex = '';
})

ce.addEventListener('click', () => {
    if (!expression.innerHTML.match(/=$/)) {

        expression.innerHTML = doCE(expression.innerHTML);
        ex = doCE(ex);
        result.innerHTML = 0;

        function doCE(arg) {
            arg = arg.split(/([\/\*\+\-\=])/g);
            arg.splice(-1, 1);
            return arg.join('');
        }
    }
})

equals.addEventListener('click', () => {
    if (!ex) {
        result.innerHTML = '0';
    } else {
        ex = eval(ex);
        expression.innerHTML += '=';
        result.innerHTML = trim12(ex);
    }
})

function checkLength(arg) {
    if (arg.toString().length > 14) {
        expression.innerHTML = 'number too long'.toUpperCase();
        result.innerHTML = '0';
        ex = '0';
    }
}

function trim12(arg) {
    if (arg.toString().length > 14) {
        ex = parseFloat(arg.toPrecision(12));
        if (ex.toString().length > 14) {
            ex = ex.toExponential(9);
        };
        return ex;
    } else {
        return arg;
    }
}