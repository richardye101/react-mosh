import { Person } from './person.js';

export function promote() {}

export default class Teacher extends Person{ // default means it is the main thing that is being exported
    constructor(name, degree){
        super(name); // calls the constructor of the inherited class
        this.degree = degree;
    }
    teach() {
        console.log('teach');
    }
}