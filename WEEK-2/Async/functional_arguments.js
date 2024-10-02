function sum(a,b) {
    return a+b
}
function multiply(a,b) {
    return a*b
}
function divide(a,b) {
    return a/b
}
function subtract(a,b) {
    return a-b
}
function calculate(a,b,op){
    return op(a,b)

}

console.log(calculate(89,99,subtract));
console.log(calculate(89,99,sum));
console.log(calculate(89,99,multiply));