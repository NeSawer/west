import Creature from './Creature.js';

// Основа для собаки.


export class Dog extends Creature {
    constructor(name = 'Пес-бандит', power = 3) {
        super(name, power);
    }
}
