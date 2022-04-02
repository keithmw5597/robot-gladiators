

var fight = function(enemy) {
    //repeat and execute a slong as the enemy-robot is alive
    while(enemyHealth > 0  && playerHealth) {
        //place fight function code block here...
            //Alert players that they are starting the round
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
            // if player choses to fight, then fight
            //if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confrim player wants to skip
            var confrimSkip = window.confirm("Are you sure you'd like to quit?");
                //if yes (true), leave fight
            if (confrimSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerInfo.money -10);
                console.log("playerMoney", playerInfo.money);
                break;
            }
        }
        
        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        //Log a resulting maessage to the console so we know that it worked.
        console.log(
        playerInfo.name + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        //Subtract the value of 'enemyAttack' form the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
        playerInfo.health = Math.max(0, playerInfo.health - enemyAttack);
        //Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
        //check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
            else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
}
var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health,UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }

};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
}

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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
            window.alert("Refilling player's health by 20 for 7 dollors.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this .money >= 7) {
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
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) { 
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    
        var pickedEnemyObj = enemyInfo.length[i];
        pickedEnemyObj.health = randomNumber(40,60);
        // call fight function wit enemy-robot
        fight(pickedEnemyObj);
        if (playerInfo.health > 0 && i < enemyNames.length -1){
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            
        }
        }
        else {
            window.alert("You have lost you robot in battle! Game Over!");
            break;
        }
    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();}
};
//function to end the entire game
var endGame = function(){
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of "+ playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
}

var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
    //restart the game
    startGame();
}
else {
    window.alert("Thank you for playing Robot Gladiators!  Come back soon!");
};



//Game States
//"WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
// " LOSE" - Plater robot's health is zero or less


// start the game when the page loads
startGame();