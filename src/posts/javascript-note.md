---
title: Note | Javascript Note (Basic)
date: 2021-09-16 01:04:50
language: English
tags:
- Programming
- Javascript
- Front-end
---

## New variable
```javascript
var myName = "LYC";
let ourName = "some name";
const pi = 3.14; // not changeable
```

## Function
```javascript
function myFunction(times) {
    for (let i = 0; i < times; i++) {
        console.log("Heyya!");
    }
}
```

## List operations
```javascript
myArray = [1, 2, 3];
myArray.push([4, 5, 6]);
myArray.shift();
myArray.unshift([“Hahahaha”, “you”]);
myArray.pop();
```

## Scopes
```javascript
var global = 10; // this is a global variable

function func1() {
    oopsGlobal = 10; // no "var" so this is also a global variable
    var local = 10; // this is a local variable
}
func1();
```

## `==` and `===`
```javascript
let two = 3 == '3'; // true
let three = 3 === '3'; // false
let notTwo = 3 != '3'; // false
let notThree = 3 !== '3'; // true
```

## `Switch` statement
```javascript
function caseInSwitch(val) {
    var ans = ‘’;
    switch (val) {
        case 1:
            ans = ‘alpha’;
            break;
        case 2:
            ans = ‘beta’;
            break;
        case 3:
            ans = ‘delta’;
            break;
        case 4:
            ans = ‘gamma’;
            break;
        default:
            ans = ‘stuff’;
            break;
    }
    return ans;
}
```

## Objects → hash table
```javascript
var ourDog = {
    “name”: “Camper”,
    “legs”: 4,
    “tails”: 1,
    “family name”: “Potter”,
    “friends”: [“everything!”]
};

var myDog = {
    “name”: “Quincy”,
    “legs”: 3,
    “tails”: 1,
    “friends”: []
};

// access
myDog.legs;
ourDog[“family name”];

// add new properties
myDog.bark = “bow-wow”;
ourDog[‘bark’] = “woof”;

// delete properties
delete myDog.tails; // return “undefined”

// objects can be nested in arrays and objects (vice versa)
```

## `do while` and `while`
```javascript
function twoLoops() {
    do {
        // operations
    } while (true)

    while (true) {
        // operations
    }
}
```

## Anonymous function → arrow function
```javascript
const magic = () => new Date();
const myConcat = (arr1, arr2) => arr1.concat(arr2)
const squareList = (arr) => {
    const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x * x);
    return squaredIntegers;
}
// ???
const sum = (function() {
    return function sum(…args) {
        return args.reduce((a, b) => a + b, 0);
    }
}) ()
```

## Make copy of an array
```javascript
const arr1 = [‘JAN’, ‘FEB’, ‘MAR’];
let arr2;
(function () {
    arr2 = […arr1]; // make copy
    arr1[0] = ‘potato’;
}) ();
```

## Assign from objects
```javascript
var voxel = {x: 3, y: 4, z: 5};
const {x: a, y: b, z: c} = voxel; // a = 3, b = 4, c = 5
const [alpha, beta, , gamma] = [1, 2, 3, 4] // 1, 2, 4

let first = 8, second = 6;
(() => {
    “use strict”;
    [first, second] = [second, first]
}) ();

const source = [1, 2, 3, 4, 5, 6];
function removeFirstTwo(list) {
    const [ , , …arr] = list;
    return arr
} // arr = [3, 4, 5, 6]

const stats= {
    max: 100,
    mid: 50,
    min: 0
};
const half = (function () {
    return function half({ max, min }) {
        return (max + min) / 2;
    };
}) (); // console.log(half(stats))
```

## Template literals
```javascript
const person = {
    name: “Zodiac Hasbro”,
    age: 56
}
const greeting = `Hello, my name is ${person.name}! I am ${person.age} years old.`;

// create a person
const createPerson = (name, age, gender) => ( { name, age, gender});

// class
class SpaceShuttle {
    constructor(targetPlanet) {
        this.targetPlanet = targetPlanet;
    }
}
```

## Create an object
```javascript
const createPerson = (name, age, gender) => ( { name, age, gender});
```

## Class
```javascript
class SpaceShuttle {
    constructor(targetPlanet) {
        this.targetPlanet = targetPlanet;
    }
}

// setter and getter
class book {
    constructor(author) {
        this._author = author;
    }
    // getter
    get writer() {
        return this._author;
    }
    // setter
    set writer(updatedAuthor) {
        this._author = updatedAuthor;
    }
}
```


