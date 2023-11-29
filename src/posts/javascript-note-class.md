---
title: Note | Javascript Note (Class)
date: 2021-09-18 23:04:50
language: English
tags:
- Programming
- Javascript
- Front-end
---

## Basic
```javascript
class Rectangle {
    // Setup
    constructor(_width, _height, _colour) {
        // whem an instance is generated.
        this.width = _width;
        this.height = _height;
        this.colour = _colour;
    }

    getArea() {
        return this.width * this.height;
    }

    printDescription() {
        console.log(`I am a rectangle of ${this.width} and ${this.height} and I am ${this.colour}.`)
    }

    // Something like a property
    get twoTimesArea() {
        return 2 * this.height * this.width;
    }

    set twoTimesArea(twoTimesArea) {
        /*
            For example, if an area is passed to this method,
            this.width and this.height should be modified respectively.

         */
    }

    // Example of a static method
    static equal(a, b) {
        /*
            call static method as below:
            Rectangle.equal(rectangle1, rectangle2);
            ↑ name of the class

         */
        return a.width * a.height === b.width * b.height;
    }

    // This is a static method without instances
    static isValidDimensions (width, height) {
        return width === height;
    }
}
```

## Parent and child class
```javascript
class Person {
    constructor(_name, _age) {
        this.name = _name;
        this.age = _age;
    }

    describe() {
        console.log(`I am ${this.name}.`);
    }
}

class Programmer extends Person {
    constructor(_name, _age, _yearOfExperience) {
        super(_name, _age);

        // New property (Class Person doesn't have this)
        this.yearOfExperience = _yearOfExperience;
    }

    // Class Person doesn't have this method
    code() {
        console.log(`${this.name} is coding.`);
    }
}
```

## Polymorphism
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        console.log("Generic animal sound!");
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    makeSound() {
        super.makeSound();
        console.log("Woof! Woof!");
    }
}
```


