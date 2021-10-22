const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

class Game {
    constructor() {
        this.roundNumber = 0;
        this.isplayerTurn = false;
        this.enemies = [];
        this.currentEnemy;
        this.player;
    }
    initializeGame() {
        this.enemies.push(new Enemy('guy', 'penis'));
        this.enemies.push(new Enemy('friend', 'treat'));
        this.enemies.push(new Enemy('epstein', 'didnt kill himself'));
        this.currentEnemy = this.enemies[0];

        inquirer
            .prompt({
                type: 'text',
                name: 'name',
                message: 'What is your name?'
            })
            //destructure name from the prompt object
            //arrow function necessary here. Regular function would have made a new this.xxx
            .then(({ name }) => {
                this.player = new Player(name);

                this.startNewBattle();
            });
    }
    startNewBattle() {

        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        console.log('Your stats are:');
        console.log(this.player.getStats());
        console.log(this.currentEnemy.getDescription());
        this.battle();
    }
    battle() {
        if (this.isPlayerTurn) {
            //PLAYER PROMPTS WILL GO HERE
            inquirer.prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potions']
            }).then(({ action }) => {
                if (action === 'Use potions') {
                    if (!this.player.getInventory()) {
                        console.log('ya got no potions, DUMMY!');
                        return this.checkEndOfBattle();
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion`);
                            this.checkEndOfBattle();
                        });

                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                    return this.checkEndOfBattle();
                }
            });
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
            this.checkEndOfBattle();
        }
    }
    checkEndOfBattle() {
        if (this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerTurn = !this.isPlayerTurn;
            this.battle();
        } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You've defeated the ${this.currentEnemy.name}`);

            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

            this.roundNumber++;

            if (this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            } else {
                console.log('You win!');
            }
        } else {
            console.log("You've been defeated!");
        }
    }
}





module.exports = Game;