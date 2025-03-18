import Creature from './Creature.js';
import TaskQueue from './TaskQueue.js';

export class Nemo extends Creature {
    constructor() {
        super("Немо", 4);
    }
    
    doBeforeAttack(gameContext, continuation) {
        const {currentPlayer, oppositePlayer, position, updateView} = gameContext;
        const oppositeCard = oppositePlayer.table[position];
        Object.setPrototypeOf(this, Object.getPrototypeOf(oppositeCard));
        updateView();
        oppositeCard.doBeforeAttack(gameContext, continuation);
    }
}
