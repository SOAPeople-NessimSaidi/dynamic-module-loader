function init() {
    console.log('Module 1 initialized');
}

function hello() {
    console.log('Hello from module1!');
}

module.exports = {
    init,
    hello
}