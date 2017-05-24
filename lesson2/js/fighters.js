'use strict'
//==================DECLARATION AREA==============================
class Fighter {
    constructor (name="Brave Fighter", power=1, health=100) {
        this.name=name;
        this.power=parseInt(power);
        this.health=parseInt(health);
    }

    setDamage(damage) {
        this.health+=-damage;
        console.log(`${this.name}'s health: ${this.health}`);
        return this.health; //Можно как то сразу обработать инфу о оставшихся НР
    }
    hit(enemy, point) {
        let damage = point * this.power;
        return enemy.setDamage(damage);
    }
};

class ImprovedFighter extends Fighter {
    doubleHit(enemy, point) {
        return super.hit(enemy, point*2);
    }
};

function fight(fighter1, fighter2, ...point) {
  // This function must initialize battle, check who will hit first with help
  // of random and then call fighters to hit each other hard
  // as input provide 2 objects as fighters and any number of points that will
  // have effect on hit damage

    let [first, second] = firstTurn(arguments[0], arguments[1]);
    //decided who will have 1st turn;

    for(let key of point) {
        bestHit(first, second, key);
        if (second.health <= 0) return console.log(`${second.name} is dead,`
            +`we have a winner! Congratulatin ${first.name}!`);
        bestHit(second, first, key);
        if (first.health <= 0) return console.log(`${first.name} is dead,`
            +`we have a winner! Congratulatin ${second.name}!`);
    }

    //If noone died after provided pointsd, then.....>>
    result = compareHealth(first, second);
    console.log(result);
    return result;
};

//===================SUPPORT FUNCTIONS===========================
var firstTurn = (obj1, obj2) => {
    //randimly decided who will have 1st turn;

    return (Math.random() < 0.5) ? [obj1, obj2] : [obj2, obj1]
};

var bestHit = (obj, enemy, point) => {
// If it is instance of ImproovedClass - it will use double hit on enemy,
// otherwise it will use regular "hit" method
    return ("doubleHit" in obj) ? obj.doubleHit(enemy, point): obj.hit(
        enemy, point);
};

var compareHealth = (obj1, obj2) => {
    //If noone died after provided points, then we are counting "the score">>

    if (obj1.health < obj2.health) {
        return console.log(`${obj1.name} loosed as he have less health`
            +`remains than ${obj2.name}!`);}
    else if (obj1.health > obj2.health) {
        return console.log(`${obj2.name} loosed as he have less health`
            +`remains than ${obj1.name}!`);}
    else {return console.log("Spare!");}
};

  //==================CODE RUN HERE===========================

let bot1 = new Fighter( "Frodo", "1", 100);
let bot2 = new Fighter( "Pedro", "2", 110);
let megaBot1 = new ImprovedFighter("Serious Sam", 3, 120);
let megaBot2 = new ImprovedFighter("Terminator", 4, 130);

compareHealth(bot1, bot2);
fight(bot1, megaBot1, 2, 10, 20);
// fight(bot2, megaBot2, 1, 2, 3, 4, 5, 9);

// console.log(bot1);
// console.log(megaBot1);

//a) - block scoping (let)--------------let damage = point * this.power
//b) - spread / rest operator-----------function fight(fighter, fighter2, ...point)
//c) - default settings-----------------constructor (name="Brave Fighter", power=1, health=100)
//d) - string interpolation-------------`${var} text` i used almost evherywhere. My favorite ferature of ES2015!
//e) - arrow functions------------------var bestHit = (obj) => {
//f) - classes + inheritance + super----Done + Done +  super.hit(enemy, point*2)