import Creature from './Creature.js';
import TaskQueue from './TaskQueue.js';

export class Rogue extends Creature {
    constructor() {
        super("Изгой", 2);
    }
    
    doBeforeAttack(gameContext, continuation) {
        const {currentPlayer, oppositePlayer, position, updateView} = gameContext;
        const oppositeCard = oppositePlayer.table[position];
        if (oppositeCard) {
            this.modifyDealedDamageToCreature = Object.getPrototypeOf(oppositeCard).modifyDealedDamageToCreature;
            this.modifyDealedDamageToPlayer = Object.getPrototypeOf(oppositeCard).modifyDealedDamageToPlayer;
            this.modifyTakenDamage = Object.getPrototypeOf(oppositeCard).modifyTakenDamage;
            delete Object.getPrototypeOf(oppositeCard).modifyDealedDamageToCreature;
            delete Object.getPrototypeOf(oppositeCard).modifyDealedDamageToPlayer;
            delete Object.getPrototypeOf(oppositeCard).modifyTakenDamage;
        }
        continuation();
    }
}
