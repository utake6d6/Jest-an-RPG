const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function () {
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "baseball bat"));
  this.enemies.push(new Enemy("skeleton", "axe"));
  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);
      // placeholder for starting a new round
      this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function () {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }
  console.log("Your stats are as follows:");
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());
  this.battle(); //// NOT SURE ABOUT THIS LINE???
};

Game.prototype.battle = function () {
  if (this.isPlayerTurn) {
    // Prompt user to attack or use a Potion
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use potion"],
      })
      // If using a Potion
      .then(({ action }) => {
        if (action === "Use potion") {
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return;
          }
          // Display list of Potion objects to user
          inquirer
            .prompt({
              type: "list",
              message: "Which potion would you like to use?",
              name: "action",
              choices: this.player
                .getInventory()
                .map((item, index) => `${index + 1}: ${item.name}`),
            })
            .then(({ action }) => {
              const potionDetails = action.split(": ");

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion.`);
            });
        }
      });
    // Apply selected Potion effect to Player

    // If attacking:

    // Subtract health from the Enemy based on Player attack value

    // If Enemy turn:

    // Subtract health from the Player based on Enemy attack value
  }
};

module.exports = Game;

// else {
//           const damage = this.player.getAttackValue();
//           this.currentEnemy.reduceHealth(damage);

//           console.log(`You attacked the ${this.currentEnemy.name}`);
//           console.log(this.currentEnemy.getHealth());
