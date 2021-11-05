class MyClass {
    constructor(name) {
        this.name = name;
    }
    disPlay() {
        console.log("My name is ");
        console.log(this.name);
    }
}

module.exports = MyClass