
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (min - max +1) + min);

    return value;
};
var fightOrSkip = function() {
    //ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "Skip" to choose.');
    //Enter the conditioinal recursive function call here!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();
    //if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        var confrimSkip = window.confirm("Are you sure you'd like to quit?");
        //if yes (true), leave fight
        if (confrimSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money form playerMoney for skipping
            playerInfo.playerMoney = Math.max(0, playerInfo.money -10);
            return true;
        }
        //return false
    }
    return false;
};
var fight = function(enemy) {
    //keep track of who goes first
    var isPLayerTurn = true;
    if (Math.random() >.5) {
        isPLayerTurn = false;
    }

    //repeat and execute a slong as the enemy-robot is alive
    while(playerInfo.health > 0  && enemy.health > 0) {
        //if it is the player-robot's turn:
        if (isPLayerTurn) {
            if (fightOrSkip()) {
                break;
            }
 
        var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        //Log a resulting maessage to the console so we know that it worked.
        console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        var damage = randomNumber(enemy.attack -3, enemy.attack);
        //Subtract the value of 'enemyAttack' form the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        //Log a resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
        //check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
            else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        }
        isPLayerTurn = !isPLayerTurn;
    }
};

var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        console.log(playerInfo);
        if (playerInfo.health > 0) { 
            
            window.alert("Welcome to Robot Gladiatiors! Round" + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40,60);
            // call fight function wit enemy-robot
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};
//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    var highSore = localStorage.getItem("highscore");
    if (highSore === null) {
        highSore = 0;
    }
    if (playerInfo.money > highSore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highSore + ". Maybe next time!");
    }

    var playAgainConfirm = window.confirm('Would you like to play again?');

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert('Thank you for playing Robot Gladiators! Come back soon!');
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to (1) for refilling your health, (2) for upgrading your attack, or (3) to leave the store? Please enter the corrasponding number: to make a choice."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth(); 
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: 'Roborto',
        attack: randomNumber(10,14)
    },
    {
        name: 'Amy Android',
        attack: randomNumber(10,14)
    },
    {
        name: 'Robo Trumble',
        attack: randomNumber(10,14)
    }
];





//Game States
//"WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// " LOSE" - Plater robot's health is zero or less


// start the game when the page loads
startGame();