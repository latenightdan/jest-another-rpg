const Potion = require('./Potion');
const Character = require('./Character');

class Enemy extends Character{
    constructor(name, weapon) {
        super(name);
        // this.name = name;
        this.weapon = weapon;
        this.potion = new Potion();

        // this.health = Math.floor(Math.random() * 10 + 85);
        // this.strength = Math.floor(Math.random() * 5 + 5);
        this.agility = Math.floor(Math.random() * 5 + 5);
    }
    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    }
    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared`;
    }
};
// Enemy.prototype = Object.create(Character.prototype);

module.exports = Enemy;






// Enemy.prototype.getHealth = function () {
//     return `${this.name}'s health is now ${this.health}!`
// }


// Enemy.prototype.reduceHealth = function(health){

//     this.health -= health;

//     if(this.health < 0){
//         this.health = 0;
//     }
// };
// Enemy.prototype.getAttackValue = function() {
//     const min = this.strength -5;
//     const max = this.strength + 5;

//     //i don't understand the return statemtn here. Why the random x max -min + min??
//     return Math.floor(Math.random() * (max - min) + min);
// }