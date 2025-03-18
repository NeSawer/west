import Creature from './Creature.js';
import TaskQueue from './TaskQueue.js';

export class Gatling extends Creature {
    constructor() {
        super("Гатлинг", 6);
    }
    
    attack(gameContext, continuation) {
        const taskQueue = new TaskQueue();

        const {currentPlayer, oppositePlayer, position, updateView} = gameContext;

        for (const card of oppositePlayer.table) {
            taskQueue.push(onDone => this.view.showAttack(onDone));
            taskQueue.push(onDone => {;
                this.dealDamageToCreature(this.currentPower, card, gameContext, onDone);
            });
        }

        taskQueue.continueWith(continuation);
    }
}
