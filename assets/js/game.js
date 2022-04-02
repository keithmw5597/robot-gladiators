var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
}

var fight = function(enemyName) {
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
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney -10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
        //Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        var damage = randomNumber(playerAttack -3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        //Log a resulting maessage to the console so we know that it worked.
        console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            //award player money for winning
            playerMoney = playerMoney + 20;
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        //Subtract the value of 'enemyAttack' form the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
        playerHealth = Math.max(0, playerHealth - enemyAttack);
        //Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
            else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
}
var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health,UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't hav eenought money!");
            }
            break;
        case "upgrade":
        case "UPGRADE":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney -7;
            }
            else {
                window.alert("You don't have enough money!");
            }
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
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) { 
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    
        var pickedEnemyName = enemyNames[i];
        enemyHealth =randomNumber(40,60);
        // call fight function wit enemy-robot
        fight(pickedEnemyName);
        if (playerHealth > 0 && i < enemyNames.length -1){
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of "+ playerMoney + ".");
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