const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game(){
this.roundNumber = 0;
this.isplayerTurn = false;
this.enemies = [];
this.currentEnemy;
this.player;
};

Game.prototype.initializeGame = function() {
this.enemies.push(new Enemy('goblin', 'sword'));
this.enemies.push(new Enemy('orc', 'baseball bat'));
this.enemies.push(new Enemy('skeleton', 'axe'));
this.currentEnemy = this.enemies[0];

inquirer
.prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
})
//destructure name from the prompt object
//arrow function necessary here. Regular function would have made a new this.xxx
.then(({name}) => {
    this.player = new Player(name);

    this.startNewBattle();
});
};

module.exports = Game;