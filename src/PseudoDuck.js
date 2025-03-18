import Creature from './Creature.js';
import { Dog } from './Dog.js';
import TaskQueue from './TaskQueue.js';

export class PseudoDuck extends Dog {
    constructor() {
        super("Псевдоутка", 3);
    }
    quacks(){}
    swims(){}
}
