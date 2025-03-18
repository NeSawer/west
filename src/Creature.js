import { Card } from './Card.js';
import { getCreatureDescription } from './index.js';

export default class Creature extends Card {
    constructor(name, maxPower, image) {
        super(name, maxPower, image);
    }
    getDescriptions() {
        return [getCreatureDescription(this), ...super.getDescriptions()];
    }

    get currentPower() {
        return this._currentPower;
    }

    set currentPower(value) {
        this._currentPower = Math.min(value, this.maxPower);
    }
}
