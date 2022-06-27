import React, { Component } from 'react';
// var -> function scoped
// let -> block scoped, mutable
// const -> block scoped, immutable

// ways to create a method inside an object
const person = {
    name: 'Mosh',
    walk: function() {
        console.log(this);
    },
    talk() { 
        setTimeout(() => {
            // arrow function means `this` is inherited from the context, in a normal fn it would be reset to the window
            console.log('this', this); 
        }, 1000);
    }
}

person.talk();
const targetMember = 'name';
person[targetMember] = 'John'; // used ahead of time when property is not known ahead of time
// if known ahead of time
person.name = 'John';

// functions in JS are objects with methods/properties we can use
// bind sets `this` permanently for this constant walk
const walk = person.walk.bind(person);
// walk(); // returns a reference to the global window object

// arrow function
let square = function(number) {
    return number * number;
};
// or 
square = number => number*number;
// console.log(square(5));

// arrow fn ex
const jobs = [
    { id: 1, isActive: true},
    { id: 1, isActive: true},
    { id: 1, isActive: false},
]

// const activeJobs = jobs.filter(function(job) {return job.isActive; });
const activeJobs = jobs.filter(job => job.isActive);

// arrow functions don't rebind `this`
person.talk();

// map
const colors = ['red', 'green', 'blue'];
const items = colors.map(color => `<li>${color}</li>`);
console.log(items);

// object destructuring, also assigns an alias to the object
const {name : nm} = person;

// spread operator
const first = [1,2,3];
const second = [4,5,6];
let combined = first.concat(second);
combined = [...first, 'a', ...second, 'b']; // spread operator, gets every item in an array

const clone = [...first];
console.log(first);
console.log(clone); // the same
// also works with objects
const name = { name: 'Mosh'};
const job = { job: 'Instructor'};
const combine = {...first, ...second, location: 'Australia'};
console.log(combine);

// classes, in their own module
import Teacher, { promote } from "./teacher.js";
import { Person } from './person.js';

const person1 = new Person('John');
const teacher = new Teacher('Max');
teacher.teach();

