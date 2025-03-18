import Card from './Card.js';
import Game from './Game.js';
import TaskQueue from './TaskQueue.js';
import SpeedRate from './SpeedRate.js';
import Creature from './Creature.js';
import { Gatling } from './Gatling.js';
import { Rogue } from './Rogue.js';
import { PseudoDuck } from './PseudoDuck.js';
import { Dog } from './Dog.js';
import { Nemo } from './Nemo.js';

// Отвечает является ли карта уткой.
function isDuck(card) {
    return card && card.quacks && card.swims;
}

// Отвечает является ли карта собакой.
function isDog(card) {
    return card instanceof Dog;
}

// Дает описание существа по схожести с утками и собаками
export function getCreatureDescription(card) {
    if (isDuck(card) && isDog(card)) {
        return 'Утка-Собака';
    }
    if (isDuck(card)) {
        return 'Утка';
    }
    if (isDog(card)) {
        return 'Собака';
    }
    return 'Существо';
}



// Основа для утки.
class Duck extends Creature {
    constructor(name = 'Мирная утка', power = 2) {
        super(name, power);
    }

    quacks() {
        console.log('quack');
    }

    swims() {
        console.log('float: both;');
    }
}

class Brewer extends Duck {
    constructor() {
        super('Пивовар', 2);
    }

    doBeforeAttack(gameContext, continuation) {
        const { currentPlayer, oppositePlayer } = gameContext;
        const cardsOnTable = currentPlayer.table.concat(oppositePlayer.table);

        cardsOnTable.forEach(card => {
            if (isDuck(card)) {
                card.maxPower += 1;
                card.currentPower = Math.min(card.currentPower + 2, card.maxPower);
                card.view.signalHeal();
                card.updateView();
            }
        });

        continuation();
    }
}


class Trasher extends Dog {
    constructor() {
        super('Громила', 5);
        this.modifyTakenDamage = function (value, fromCard, gameContext, continuation) {
            this.view.signalAbility(() => continuation(value - 1));
        };

        this.getDescriptions = function () {
            const baseDescriptions = Card.prototype.getDescriptions.call(this);
            const abilityDescription = "Способность: Уменьшает урон на 1.";
            return [...baseDescriptions, abilityDescription];
        };
    }
}

class Lad extends Dog {
    constructor() {
        super('Браток', 2);

    }

    static getInGameCount() {
        return this.inGameCount || 0;
    }

    static setInGameCount(value) {
        this.inGameCount = value;
    }

    static getBonus() {
        const count = this.getInGameCount();
        return count * (count + 1) / 2;
    }

    doAfterComingIntoPlay(gameContext, continuation) {
        Lad.setInGameCount(Lad.getInGameCount() + 1);
        continuation();
    }

    doBeforeRemoving(continuation) {
        Lad.setInGameCount(Lad.getInGameCount() - 1);
        continuation();
    }

    modifyDealedDamageToCreature(value, toCard, gameContext, continuation) {
        continuation(value + Lad.getBonus());
    }

    modifyTakenDamage(value, fromCard, gameContext, continuation) {
        continuation(Math.max(value - Lad.getBonus(), 0));
    }

    getDescriptions() {
        const baseDescriptions = Card.prototype.getDescriptions.call(this);

        if (Lad.prototype.hasOwnProperty('modifyDealedDamageToCreature') ||
            Lad.prototype.hasOwnProperty('modifyTakenDamage')) {
            baseDescriptions.push("Чем их больше, тем они сильнее");
        }

        return baseDescriptions;
    }
}

const seriffStartDeck = [
    new Gatling(),
    new Duck(),
    new Brewer(),
    new Trasher(),
];
const banditStartDeck = [
    new Dog(),
    new Rogue(),
    new Nemo(),
    new Lad(),
    new PseudoDuck(),
];
// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
SpeedRate.set(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});
