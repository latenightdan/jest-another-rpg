const Potion = require('../lib/Potion');
const Character = require('./Character');


class Player extends Character{
    constructor(name = '') {

        super(name);
     
        this.inventory = [new Potion('health'), new Potion()];
    }
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }
    addPotion(potion) {
        this.inventory.push(potion);
    }
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
}

// Player.prototype = Object.create(Character.prototype);




module.exports = Player;




    // isAlive() {
    //     if (this.health === 0) {
    //         return false;
    //     }
    //     return true;
    // }












// Player.prototype.getHealth = function () {
//     return `${this.name}'s health is now ${this.health}!`
// }


// Player.prototype.reduceHealth = function(health){

//     this.health -= health;

//     if(this.health < 0){
//         this.health = 0;
//     }
// };
// Player.prototype.getAttackValue = function() {
//     const min = this.strength -5;
//     const max = this.strength + 5;

//     //i don't understand the return statemtn here. Why the random x max -min + min??
//     return Math.floor(Math.random() * (max - min) + min);
// }